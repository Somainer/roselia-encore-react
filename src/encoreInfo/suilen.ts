import * as Helper from '../rhodonite/protocols/helpers'

const members = Helper.makeMembers([
    {
        name: {
            jp: "レイヤ",
            cn: "LAYER",
            en: "LAYER"
        },
        birthday: '',
        role: "Vo/Ba",
        CVName: {
            jp: "Raychell",
            cn: "Raychell",
            en: "Raychell"
        },
        horoscope: '',
        encoreColor: "#CD0A10",
    },
    {
        name: {
            en: "LOCK",
            cn: "朝日六花",
            jp: "ロック"
        },
        CVName: {
            en: "Kohara Riko",
            cn: "小原莉子",
            jp: "小原莉子"
        },
        birthday: "",
        role: "Gt",
        horoscope: "",
        encoreColor: "#BCFF64"
    },
    {
        name: {
            "en": "MASKING",
            "cn": "MASKING",
            "jp": "マスキング"
        },
        birthday: "",
        role: "Dr",
        horoscope: "",
        encoreColor: "#E1BA39",
        CVName: {
            en: "Natsume",
            cn: "夏芽",
            jp: "夏芽"
        }
        
    },
    {
        name: {
            en: "PAREO",
            cn: "PAREO",
            jp: "パレオ"
        },
        birthday: "",
        horoscope: "",
        role: 'Key',
        encoreColor: "#FF99CC",
        CVName: {
            en: "Kurachi Reo",
            cn: "仓知玲凤",
            jp: "倉知玲鳳"
        },
        external: [
            {
                title: '',
                content: 'Dark 丸山彩',
                hidden: true
            }
        ]
    },
    {
        name: {
            en: "CHU²",
            cn: "CHU²",
            jp: "チュチュ"
        },
        birthday: "",
        horoscope: "",
        role: 'Dj',
        encoreColor: "#33CCFF",
        CVName: {
            en: "Tsumugi Risa",
            cn: "紡木吏佐",
            jp: "紡木吏佐"
        }
    }
])

const siteConfig = Helper.makeSiteConfig({
    title: 'Raise a Suilen',
    configName: 'suilen',
    siteFavicon: '/img/suilen/RAS.png',
    siteLogo: '/img/suilen/logo.png',
    singles: Helper.makeTrackOf('single')([
        {
            id: 1,
            title: 'R·I·O·T',
            track: ['R·I·O·T', 'UNSTOPPABLE', 'R·I·O·T -instrumental-', 'UNSTOPPABLE -instrumental-'],
            releaseDate: '2018/12/12',
            links: [
                {
                    description: 'BanG Dream',
                    link: 'https://bang-dream.com/discographies/634'
                },
                {
                    description: 'NetEase',
                    link: 'https://music.163.com/album?id=74857151'
                },
                {
                    description: 'Apple Music',
                    link: 'https://itunes.apple.com/cn/album/r-i-o-t/1444590733'
                }
            ],
            hasLimitedEdition: true
        },
        {
            id: 2,
            title: 'A DECLARATION OF ×××',
            track: ['A DECLARATION OF ×××', 'EXPOSE ‘Burn out!!!’ ', 'A DECLARATION OF ××× -instrumental-', 'EXPOSE ‘Burn out!!!’  -instrumental-'],
            releaseDate: '2019/2/20',
            links: [
                {
                    description: 'BanG Dream',
                    link: 'https://bang-dream.com/discographies/741'
                },
                {
                    description: 'NetEase',
                    link: 'https://music.163.com/album?id=75639799'
                },
                {
                    description: 'Apple Music',
                    link: 'https://itunes.apple.com/cn/album/a-declaration-of-single/1450478943'
                }
            ],
            hasLimitedEdition: true
        }
    ]),
    members,
    themeColor: '',
    bannerImage: {
        background: '/img/suilen/banner.jpg'
    },
    getters: {
        cvImageGetter(m) {
            return ''
        },
        memberImageGetter(m) {
            return ''
        },
        trackImageGetter (t) {
            return `/img/suilen/${Helper.capatialize(t.type!)}_${t.id}.jpg`
        },
        limitedTrackImageGetter (t) {
            return `/img/suilen/${Helper.capatialize(t.type!)}_${t.id}_lim.jpg`
        }
    },
    plugins: {}
})

export default siteConfig
