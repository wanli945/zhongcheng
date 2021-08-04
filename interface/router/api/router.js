module.exports = ({mysql}) => {
    console.log(mysql)
    return {
        post: (req, res) => {
            res.json({
                code: true,
                route: [
                    {
                        path: '/main',
                        name: 'main',
                        component: 'homepage',
                        children: [
                            {
                                path: '/material',
                                name: 'material',
                                component: 'client/material',
                            }
                        ]
                    },
                    {
                        path: '/custname/:id', // 客户信息
                        name: 'custname',
                        component: 'custname',
                    }
                ]
            })
        },
        get: (req, res) => {

        }
    }
}
