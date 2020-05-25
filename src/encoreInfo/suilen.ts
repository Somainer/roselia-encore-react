import * as Helper from '../rhodonite/protocols/helpers'

const members = Helper.makeMembers([
    {
        name: {
            jp: "和奏レイ",
            cn: "和奏瑞依",
            en: "Wakana Rei"
        },
        birthday: '1-13',
        role: "Vo/Ba LAYER",
        CVName: {
            jp: "Raychell",
            cn: "Raychell",
            en: "Raychell"
        },
        zodiac: 'capricorn',
        encoreColor: "#CD0A10"
    },
    {
        name: {
            en: "Asahi Rokka",
            cn: "朝日六花",
            jp: "朝日六花"
        },
        CVName: {
            en: "Kohara Riko",
            cn: "小原莉子",
            jp: "小原莉子"
        },
        birthday: "7-17",
        role: "Gt LOCK",
        zodiac: 'cancer',
        encoreColor: "#BCFF64"
    },
    {
        name: {
            "en": "Sato Masuki",
            "cn": "佐藤益木",
            "jp": "佐藤ますき"
        },
        birthday: "5-12",
        role: "Dr MASKING",
        zodiac: 'taurus',
        encoreColor: "#E1BA39",
        CVName: {
            en: "Natsume",
            cn: "夏芽",
            jp: "夏芽"
        }
        
    },
    {
        name: {
            en: "Nyubara Reona",
            cn: "PAREO",
            jp: "鳰原れおな"
        },
        birthday: "3-25",
        zodiac: 'aries',
        role: 'Key PAREO',
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
            en: "Tamade Chiyu",
            cn: "CHU2",
            jp: "玉出ちゆ"
        },
        birthday: "12-7",
        zodiac: 'sagittarius',
        role: 'Dj CHU²',
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
        },
        {
            id: 3,
            title: 'Invincible Fighter',
            track: ['Invincible Fighter', 'Takin’ my Heart', 'Invincible Fighter -instrumental-', 'Takin’ my Heart -instrumental-'],
            releaseDate: '2019/06/19',
            links: [
                {
                    description: 'BanG Dream',
                    link: 'https://bang-dream.com/discographies/962'
                },
                {
                    description: 'Apple Music',
                    link: 'https://music.apple.com/cn/album/invincible-fighter-single/1465072434'
                },
                {
                    description: 'NetEase',
                    link: 'https://music.163.com/album?id=79877573'
                }
            ],
            external: [
                {
                    title: 'Blu-ray',
                    content: [
                        'アニメ「BanG Dream! 2nd Season」#3~#4',
                        'Web用次回予告#3~#4',
                        '「History of RAS」再編集版'
                    ],
                    hidden: false
                }
            ],
            hasLimitedEdition: true
        },
        {
            id: 4,
            title: 'DRIVE US CRAZY',
            track: ['DRIVE US CRAZY', 'HELL! or HELL?', 'DRIVE US CRAZY -instrumental-', 'HELL! or HELL? -instrumental-'],
            releaseDate: '2020/01/22',
            links: [
                {
                    description: 'BanG Dream!',
                    link: 'https://bang-dream.com/discographies/1389'
                },
                {
                    description: 'Apple Music',
                    link: 'https://music.apple.com/cn/album/drive-us-crazy-single/1492220767'
                },
                {
                    description: 'NetEase',
                    link: 'https://music.163.com/album?id=85117423'
                }
            ],
            hasLimitedEdition: true
        }
    ]),
    members,
    themeColor: '',
    bannerImage: {
        background: '/img/suilen/background.jpg',
        // foreground: '/img/suilen/ras-fore.png'
    },
    getters: {
        cvImageGetter(m) {
            return m.cvImage || ''
        },
        memberImageGetter(m) {
            return m.memberImage || ''
        },
        trackImageGetter(t) {
            if(t.cover) return t.cover
            return `/img/suilen/${Helper.capatialize(t.type!)}_${t.id}.jpg`
        },
        limitedTrackImageGetter (t) {
            return `/img/suilen/${Helper.capatialize(t.type!)}_${t.id}_lim.jpg`
        }
    },
    plugins: {}
})

export default siteConfig
