const Index = require("./comm")
/*客户端需要的Unit函数*/
class Client extends Index {
    constructor() {
        super();
    }

    /*
    *
    * */
    arrToTree(data, parent) {
        const tree = [];
        let temp;
        data.forEach(value => {
            if (value.parentMenuId === parent) {
                const obj = Object.assign({}, value, {
                    children: null,
                });
                temp = this.arrToTree(data, value.id);
                if (temp.length > 0) {
                    obj.children = [];
                    obj.children.push(...temp)
                }
                tree.push(obj);
            }
        })
        return tree;
    }

    /*
    *
    * 限定 业务员  和  受理员
    * */
    poolLimit({
                  username,
                  phone,
                  department, // 部门
                  role, // 角色
                  id,
                  password
              }) {

        const has = (roles) => {
            return !!~role.trim().indexOf(roles);
        }
        return {
            ServerName: has('业务员') && username, // 业务员权限
            AssignName: has('受理员') && username //  受理员权限
        }
    }

    /*
    * 地市的判断
    * */
    ComplementaryCity(address = "", CityDictReg) {
        const __Cty = () => {
            let ssd = []
            for (let reg of Object.values(CityDictReg)) {
                let cansud = reg.reg.exec(address)
                if (cansud) {
                    ssd = [reg.value, cansud[0]]
                }
            }
            return ssd
        }
        let pageAddress = null
        try {
            pageAddress = address.split("-");
            if (pageAddress.length === 1) {
                return __Cty()
            } else if (pageAddress.length === 2) {
                return pageAddress
            }
        } catch (e) {
            return ""
        }
    }

    messData(list = [], type = "商机单") {

        const date = this.timestamp(new Date())
        if (type === "新增商机单") {
            return []
        }
        if (type === "信息流_待二次外呼") {
            const array = []
            list.forEach(value => {
                let BH = Date.now() + Math.floor(Math.random() * 1000)
                array.push({
                    date,
                    type: "信息流待二次外呼",
                    message: `手机号：${value.phone}，姓名：${value.name}，订单编号：${value.id}。`,
                    id: BH + value.id
                })
            });
            return array
        }
    }

    /*
    * 多余信息到 备注
    *
accept2:  产品名称2
accept3: 产品名称3
broadband2: 业务号码2
broadband3: 业务号码3
//c4name: 地区
kdBroadband: 宽带账号
nowDiscount: 现有优惠
nowPackageType: 现有套餐类型
packageChange: 需更改套餐类型
secondaryCard: 副卡
terminalModel: 终端型号
terminalNumber: 终端串号
//tmallId: 天猫订单号
    * */
    field2remark(data) {
        let _value = "";
        let obj = {
            otherInfo: {},
            remark: data.remark || ""
        };

        let box = [
            ['c4name', '地区'],
            ['kdBroadband', '宽带账号'],
            ['nowDiscount', '现有优惠'],
            ['nowPackageType', '现有套餐类型'],
            ['packageChange', '需更改套餐类型'],
            ['packageContent', '套餐内容'],
            ['packageType', '套餐类型'],
            ['secondaryCard', '副卡'],
            ['terminalModel', '终端型号'],
            ['terminalNumber', '终端串号'],
            ['tmallId', '天猫订单号']
        ];

        box.forEach((value, index) => {
            obj.otherInfo[value[0]] = {
                attrName: value[1],
                attrValue: data[value[0]] || ""
            }
        });
        console.log(obj)
        return data.remark;
    }
}


module.exports = Client
