/*
* 下载文件   a标签
* */
export default function downAllFileFn(href) {
    const box = document.querySelector("#downloadFileBox")
    const eLink = document.createElement("a");
    eLink.href = href;
    eLink.target = "_blank"
    eLink.style.display = "none";
    box.appendChild(eLink);
    eLink.click();
    setTimeout(() => {
        box.innerHTML = "";
    });
}

/*
* 会有同源策略限制的下载方式   需要同端口同ip   转文件流
* */
export const downAllFile = (that) => (filePath = "", name) => {
    const box = document.querySelector("#downloadFileBox");
    let nameArr = filePath.split("/");
    name = name || nameArr[nameArr.length - 1];
    let loading = that.$loading({
        background: "rgba(0,0,0,.6)",
        body: true,
        text: "下载中",
    })
    //fetch函数
    fetch(filePath).then(res => {
        const is = res.status
        if ((is >= 200 && is < 300) || is === 304) {
            return res.blob()
        } else {
            return Promise.reject("资源获取失败")
        }
    }).then(blob => {
        const a = document.createElement('a');
        a.style.display = 'none'
        // 使用获取到的blob对象创建的url
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.target = "_blank"
        // 指定下载的文件名
        a.download = name;
        box.append(a)
        a.click();
        setTimeout(() => {
            box.innerHTML = ""
            // 移除blob对象的url
            window.URL.revokeObjectURL(url);
        })
    }).catch(reason => {
        that.$message({
            type: "error",
            message: "资源获取失败",
            duration: 1500,
        })
    }).finally(() => {
        loading.close();
    });
}
