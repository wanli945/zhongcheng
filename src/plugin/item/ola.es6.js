/*
* 兼容火狐 WebSocket
* */
if (typeof window['MozWebSocket'] === "function") {
    WebSocket = window['MozWebSocket'];
}

export default class Ola {
    version = '2.0.1';
    ws = undefined;
    uuid = "73836387-0000-0000-0000-0000-0000000000";
    connected = false;
    socket_connected = false;
    onConnect = undefined;
    onMessage = undefined;
    onClose = undefined;
    _connectSuccess = undefined;
    _connectError = undefined;
    _username = undefined;
    _password = undefined;
    _extn = undefined;
    canUse = typeof window.WebSocket === "function"
    vue = null

    constructor({url = "ws://" + document.location.hostname + ':29003' + "/ola_socket", vue} = {}) {
        this.vue = vue
        this.url = url;
        if (!this.canUse) {
            this.vue.$alert("浏览器不支持WebSocket", "提示", {
                type: "error",
                showCancelButton: false
            })
        }

    }

    /*
    * 连接
    * */
    connect({
                username,
                password,
                success = () => {
                }, error = () => {
        },
                onConnect = () => {

                },
                onMessage = () => {
                },
                onClose = () => {

                }
            } = {}) {
        this.ws = new WebSocket(this.url);
        this._username = username;
        this._password = password;
        this.ws.onclose = this._onClose
        this.ws.onopen = this._onOpen
        this.ws.onmessage = this._onMessage;
        this.ws.onerror = this._onError;
        /*
        *  连接失败成功的函数
        * */
        this._connectError = error;
        this._connectSuccess = success;
        this.onConnect = onConnect
        this.onMessage = onMessage
        this.onClose = onClose
    }

    /*
    * 登录
    * */
    login({queue, extn, params}) {
        this._extn = extn;
        return this.send({
            action: "api", cmd: 'login', args: {
                queue, extn, ...params
            }
        })
    }

    /*
    * 登出
    * */
    logout() {
        this.send({action: 'api', cmd: "logout", args: {extn: this._extn}})
    }

    /*
    * 收集..
    * */
    collect_dtmf(extn, soundfile) {
        return this.send({action: "api", cmd: "collect_dtmf", args: {extn: extn, soundfile: soundfile}});
    }


    collect_judge(extn) {
        return this.send({action: "api", cmd: "collect_judge", args: {extn: extn}});
    }

    ping() {
        return this.send({cmd: "ping"})
    }

    /*
    * 订阅
    * */
    subscribe(k) {
        return this.send({cmd: "subscribe", args: {key: k}});
    }

    /*
    * 取消订阅
    * */
    unsubscribe(k) {
        return this.send({cmd: "unsubscribe", args: {key: k}});
    }

    /*
    * 准备
    * */
    go_ready() {
        return this.send({action: "api", cmd: "go_ready", args: {extn: this._extn}});
    }

    /*
    * 打断
    * */
    go_break(reason) {
        return this.send({action: "api", cmd: "go_break", args: {extn: this._extn, reason: reason}});
    }

    toggle_ready() {
        return this.send({action: "api", cmd: "toggle_ready", args: {extn: this._extn}});
    }

    answer() {
        return this.send({action: "api", cmd: "answer", args: {extn: this._extn}});
    }

    hangup() {
        return this.send({action: "api", cmd: "hangup_other", args: {extn: this._extn}});
    }

    dial(dst, otherStr, gateway) {
        return this.send({
            action: "api",
            cmd: "dial",
            args: {extn: this._extn, dest: dst, gateway: gateway, otherStr: otherStr}
        });
    }

    transfer(dest, extn = this._extn) {
        return this.send({action: "api", cmd: "transfer", args: {extn, dest}});
    }

    transfer_uuid(channel_uuid, dest) {
        return this.send({action: "api", cmd: "transfer", args: {channel_uuid, dest}});
    }

    monitor(dest, extn = this._extn) {
        return this.send({action: "api", cmd: "monitor", args: {extn, dest}});
    }

    monitor_uuid(channel_uuid) {
        return this.send({action: "api", cmd: "monitor", args: {extn: this._extn, channel_uuid}});
    }

    intercept(dest, extn = this._extn) {
        return this.send({action: "api", cmd: "intercept", args: {extn, dest}});
    }

    intercept_uuid(channel_uuid) {
        return this.send({action: "api", cmd: "intercept", args: {extn: this._extn, channel_uuid}});
    }

    three_way(dest, goip_gateway, extn = this._extn) {
        return this.send({
            action: "api",
            cmd: "monitor",
            args: {extn, dest, three_way: "true", goip_gateway}
        });
    }

    /* hangup the thrid party */
    exit_three_way(extn) {
        return this.send({action: "api", cmd: "unmonitor", args: {extn, three_way: "true"}});
    }

    three_way_uuid(channel_uuid) {
        return this.send({
            action: "api",
            cmd: "monitor",
            args: {extn: this._extn, channel_uuid, three_way: "true"}
        });
    }


    unmonitor(extn) {
        return this.send({action: "api", cmd: "unmonitor", args: {extn}});
    }

    whisper(who) {
        // who = "agent" / "caller" / "both" / "none"
        return this.send({action: "api", cmd: "whisper", args: {extn: this._extn, who}});
    }

    consult(dest) {
        return this.send({action: "api", cmd: "consult", args: {extn: this._extn, dest}});
    }

    unconsult(dest) {
        return this.send({action: "api", cmd: "unconsult", args: {extn: this._extn, dest}});
    }

    hold() {
        return this.send({action: "api", cmd: "hold", args: {extn: this._extn}});
    }

    unhold() {
        return this.send({action: "api", cmd: "unhold", args: {extn: this._extn}});
    }

    toggle_hold() {
        return this.send({action: "api", cmd: "toggle_hold", args: {extn: this._extn}});
    }


    take_call(channel_uuid) {
        return this.send({action: "api", cmd: "take_call", args: {extn: this._extn, channel_uuid}});
    }


    kill(channel_uuid, cause) {
        return this.send({action: "api", cmd: "kill", args: {channel_uuid, cause}});
    }

    eavesdrop(channel_uuid) {
        return this.send({action: "api", cmd: "eavesdrop", args: {channel_uuid}});
    }

    conf(name, action, member) {
        return this.send({action: "api", cmd: "conf", args: {name: name, action: action, member: member}});
    }


    /* common apis*/

    /*phone control api, only yealink support for now*/
    api_handfree(extn) {
        return this.send({action: "api", cmd: "api_handfree", args: {extn}});
    }

    status() {
        return this.ws.readyState;
    }


    /*
    *认证
    * */
    auth() {
        return this.send({
            cmd: "auth",
            args: {username: this._username, password: this._password, accept: "application/json"}
        });
    }

    /*
    * 发送信息
    * */
    send(msg) {
        msg.uuid = this.next_uuid();
        this.ws.send(JSON.stringify(msg));
        return msg.uuid;
    }

    // 获取代理状态
    get_agent_state() {
        return this.send({
            action: 'api', cmd: "get_agent_state", args: {
                extn: this._extn
            }
        })
    }

    // 获取中继状态
    get_trunk_state() {
        return this.send({action: "api", cmd: "get_trunk_state"});
    }

    /*
    * 关闭
    * */
    close() {
        this.ws.close();
    }

    /*
    * 对WS的 onopen和 onmessage, onclose 进行定义
    * */
    _onOpen = (evt) => {
        console.log(this.status())
        console.log(evt)
        this.auth()
    }

    _onMessage = (evt) => {
        let msg = JSON.parse(evt.data);
        if (msg.event_name === "command/reply" && parseInt(msg.code) === 200) {
            this.ws.onmessage = this._onMessage;
        } else {
            this.ws.onmessage = this.onMessage;
        }
        this.onConnect();
    }

    _onClose = (evt) => {
        console.log(evt)
        this.vue.$message({
            type: "warning",
            message: "连接关闭",
            duration: 1500
        })
    }

    _onError = (e) => {
        console.log(e)
    }

    /*
    * 获取 uuid
    * */
    next_uuid() {
        let u = (parseFloat(this.uuid.substring(29)) + 1).toString();
        u = u === "2147483647" ? "0" : u;
        while (u.length < 12) {
            u = "0" + u;
        }
        this.uuid = "73836387-0000-0000-0000-0000-" + u;
        return this.uuid;
    }
}


