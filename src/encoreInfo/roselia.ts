import * as Helper from '../rhodonite/protocols/helpers'
import { asyncComponent } from "../rhodonite/asynccomponent";
const RoseliaLyrics = () => import('./roseliaLyric').then(x => x.RoseliaLyrics)
// import {Component} from 'react'

const members = Helper.makeMembers([
    {
        name: {
            jp: "湊友希那",
            cn: "凑友希那",
            en: "Minato Yukina"
        },
        birthday: "10-26",
        role: "Vo",
        CVName: {
            jp: "相羽あいな",
            cn: "相羽爱奈",
            en: "Aiba Aina"
        },
        bloodType: 'A',
        horoscope: "天蝎",
        encoreColor: "#890f87", //"#c67cb5",
    },
    {
        name: {
            en: "Hikawa Sayo",
            cn: "冰川纱夜",
            jp: "氷川紗夜"
        },
        CVName: {
            en: "Kudou Haruka",
            cn: "工藤晴香",
            jp: "工藤晴香"
        },
        birthday: "3-20",
        role: "Gt",
        bloodType: "AB",
        horoscope: "双鱼",
        encoreColor: "#00aabc"
    },
    {
        name: {
            "en": "Imai Lisa",
            "cn": "今井莉纱",
            "jp": "今井リサ"
        },
        birthday: "8-25",
        role: "Ba",
        bloodType: "O",
        horoscope: "处女",
        encoreColor: "#dd2200",
        CVName: [
            {
                en: "Endō Yurika",
                cn: "远藤祐里香",
                jp: "遠藤ゆりか"
            },
            {
                en: "Nakashima Yuki",
                cn: "中岛由贵",
                jp: "中島由貴"
            }
        ]
    },
    {
        name: {
            en: "Utakawa Ako",
            cn: "宇田川亚子",
            jp: "宇田川あこ"
        },
        birthday: "7-3",
        role: "Dr",
        bloodType: "B",
        horoscope: "巨蟹",
        encoreColor: "#dd0087",
        CVName: {
            en: "Sakuragawa Megu",
            cn: "樱川惠",
            jp: "桜川めぐ"
        }
    },
    {
        name: {
            en: "Shirokane Rinko",
            cn: "白金燐子",
            jp: "白金燐子"
        },
        birthday: "10-17",
        role: "Key",
        bloodType: "O",
        horoscope: "天秤",
        encoreColor: "#bbbbbb",
        CVName: [
            {
                en: "Akesaka Satomi",
                cn: "明坂聪美",
                jp: "明坂聡美"
            },
            {
                en: 'Shizaki Kanon',
                cn: '志崎桦音',
                jp: '志崎樺音'
            }
        ],
        external: [
            {
                title: '',
                hidden: false,
                content: 'twitter关注数1小时破万祝贺！'
            }
        ]
    }
])

const singles = Helper.makeTrackOf('single')([
    {
        id: 1,
        title: "BLACK SHOUT",
        track: ["BLACK SHOUT", "LOUDER", "BLACK SHOUT -instrumental- ", "LOUDER -instrumental- ", "Roseliaミニドラマ～バンド練習編～ "],
        releaseDate: "2017/4/19",
        links: [
            {
                description: "BanG Dream",
                link: "https://bang-dream.com/cd/roselia-1st-single-%E3%80%8Cblack-shout%E3%80%8D/"
            },
            {
                description: "NetEase",
                link: "http://music.163.com/album?id=35423192"
            },
            {
                description: "萌娘百科",
                link: "https://zh.moegirl.org/BLACK_SHOUT"
            }
        ],
        hasLimitedEdition: true
    },
    {
        id: 2,
        title: "Re:birth day",
        track: ["Re:birth day", "陽だまりロードナイト", "Re:birth day -instrumental- ", "陽だまりロードナイト -instrumental- ", "Roselia ミニドラマ～ふれあい動物編～ "],
        releaseDate: "2017/6/28",
        links: [
            {
                description: "BanG Dream",
                link: "https://bang-dream.com/cd/roselia-2ndsg/"
            },
            {
                description: "NetEase",
                link: "http://music.163.com/album?id=35663708"
            }
        ],
        hasLimitedEdition: true
    },
    {
        id: 3,
        title: "熱色スターマイン",
        track: ["熱色スターマイン", "－HEROIC ADVENT－", "熱色スターマイン -instrumental- ", "－HEROIC ADVENT－ -instrumental- ", "Roseliaミニドラマ～あこの厨二語辞典編～ "],
        releaseDate: "2017/8/30",
        links: [
            {
                description: "BanG Dream",
                link: "https://bang-dream.com/cd/roselia-3rd-single/"
            },
            {
                description: "NetEase",
                link: "http://music.163.com/album?id=36030721"
            }
        ]
    },
    {
        id: 4,
        title: "ONENESS",
        track: ["ONENESS", "Determination Symphony", "ONENESS -instrumental- ", "Determination Symphony -instrumental- "],
        releaseDate: "2017/11/29",
        links: [
            {
                description: "BanG Dream",
                link: "https://bang-dream.com/cd/roselia4th/"
            },
            {
                description: "NetEase",
                link: "http://music.163.com/album?id=36856222"
            }
        ],
        hasLimitedEdition: true
    },
    {
        id: 5,
        title: "Opera of the wasteland",
        track: ["Opera of the wasteland", "軌跡", "Opera of the wasteland -instrumental- ", "軌跡 -instrumental- "],
        releaseDate: "2018/3/21",
        links: [
            {
                description: "BanG Dream",
                link: "https://bang-dream.com/cd/roselia_5th/"
            },
            {
                description: "NetEase",
                link: "http://music.163.com/album?id=37987030"
            }
        ],
        external: [{
            title: "P.S.",
            content: ["和PP'P的⑨单一起买有特典？买买买（钱包卒）"]
        }]
    },
    {
        id: 6,
        title: "R",
        track: ["R", "BLACK SHOUT(リマスターver.)", "Neo-Aspect(リマスターver.)", "R -instrumental-", "BLACK SHOUT(リマスターver.) -instrumental-"],
        releaseDate: "2018/07/25",
        links: [
            {
                description: "BanG Dream",
                link: "https://bang-dream.com/discographies/367"
            },
            {
                description: "NetEase",
                link: "https://music.163.com/album?id=71852033"
            }
        ],
        external: [{
            title: "P.S.",
            content: ["BanG-Dream的网站改版了！（终于不用WordPress了）| Yuki真棒.jpg"]
        }],
        hasLimitedEdition: true
    },
    {
        id: 7,
        title: "BRAVE JEWEL",
        track: ["BRAVE JEWEL", "Sanctuary", "BRAVE JEWEL -instrumental-", "Sanctuary -instrumental-"],
        releaseDate: "2018/12/12",
        links: [
            {
                description: "BanG Dream",
                link: "https://bang-dream.com/discographies/633"
            }
        ],
        external: [{
            title: "P.S.",
            content: ["这首单曲还是19年的第二季的OP，啊真香", "双OP好评"]
        }],
        hasLimitedEdition: true
    }
])

const albums = Helper.makeTrackOf('album')([
    {
        id: 1,
        title: "Anfang",
        track: ["Neo-Aspect", "BLACK SHOUT", "Opera of the wasteland", "陽だまりロードナイト", "ONENESS", "Re:birth day", "Legendary", "－HEROIC ADVENT－", "Determination Symphony", "熱色スターマイン", "軌跡", "LOUDER"],
        releaseDate: "2018-5-2",
        links: [
            {
                description: "BanG Dream",
                link: "https://bang-dream.com/discographies/113"
            },
            {
                description: "NetEase",
                link: "http://music.163.com/m/album?id=38509280"
            }
        ],
        hasLimitedEdition: true,
        external: [{
            title: "P.S.",
            content: ["嘛，这个好像是买Blu-ray付生産限定盤更有意义呢，通常版的东西就少得可怜了，不过就当单曲买了也不亏（3200+JPY）"]
        }]
    }
])

const siteConfig: Helper.SiteConfig = {
    configName: "roselia",
    members,
    siteLogo: '/img/logo.png',
    siteFavicon: '/img/roselia.png',
    singles,
    albums,
    themeColor: '#5869b1',
    playerUrl: '' && 'https://music.163.com/outchain/player?type=0&id=1999324469&auto=0&height=430',
    bannerImage: {
        foreground: '/img/roselia characters.png',
        background: '/img/roselia-top.png'
    },
    externalTrackLists: Helper.makeExternalTrackList([
        {
            displayName: {
                cn: '翻唱集',
                en: 'Cover Collection',
                jp: 'カバーコレクション'
            },
            trackType: 'cover',
            trackList: [
                {
                    id: 1,
                    title: "バンドリ！ ガールズバンドパーティ！ カバーコレクション Vol.1",
                    track: ["光るなら / Poppin’Party", "千本桜 / Poppin’Party", "アスノヨゾラ哨戒班 / Afterglow", "READY STEADY GO / Afterglow", "secret base ～君がくれたもの～ / Pastel＊Palettes", "ふわふわ時間 / Pastel＊Palettes", "魂のルフラン / Roselia", "ETERNAL BLAZE / Roselia", "いーあるふぁんくらぶ / ハロー、ハッピーワールド！", "ロメオ / ハロー、ハッピーワールド！"],
                    releaseDate: "2018-06-27",
                    links: [
                        {
                            description: "BanG Dream",
                            link: "https://bang-dream.com/cd/%E3%83%90%E3%83%B3%E3%83%89%E3%83%AA%EF%BC%81-%E3%82%AC%E3%83%BC%E3%83%AB%E3%82%BA%E3%83%90%E3%83%B3%E3%83%89%E3%83%91%E3%83%BC%E3%83%86%E3%82%A3%EF%BC%81-%E3%82%AB%E3%83%90%E3%83%BC%E3%82%B3%E3%83%AC/"
                        },
                        {
                            description: "NetEase",
                            link: "http://music.163.com/m/album?id=38272155"
                        }
                    ]
                }
            ]
        }
    ]),
    getters: {
        trackImageGetter (t) {
            return `/img/${Helper.capatialize(t.type!)}_${t.id}.jpg`
        },
        limitedTrackImageGetter (t) {
            return `/img/${Helper.capatialize(t.type!)}_${t.id}_lim.jpg`
        },
        memberImageGetter (m) {
            return `/img/member_${m.name.en.split(' ')[1].toLowerCase()}.jpg`
        },
        cvImageGetter (m) {
            return `/img/cv_${Helper.getLastLanguageAttribute(m.CVName).en.split(' ')[1].toLowerCase()}.jpg`
        }
    },
    plugins: {
        single: asyncComponent(RoseliaLyrics)
    },
    videos: require('./roseliaRecommandVideo.json').map((x: any) => new Helper.BilibiliVideoAdapter(x)),
    bangumiList: [
        {
            name: "BanG Dream! TV",
            coverImage: '/img/bangumi/bd1st.jpg',
            releaseDate: '2017/1/21',
            link: 'https://www.bilibili.com/bangumi/media/md5807',
            meta: '话说每集的题目真是不得了啊'
        },
        {
            name: 'BanG Dream! OVA',
            coverImage: '/img/bangumi/bd1st.jpg',
            releaseDate: '2017/8/20',
            link: 'https://www.bilibili.com/bangumi/media/md6398',
            meta: ''
        },
        {
            name: 'BanG Dream! 少女乐团派对☆PICO',
            coverImage: '/img/bangumi/bdpico.png',
            releaseDate: '2018/7/5',
            link: 'https://www.bilibili.com/bangumi/media/md135252/',
            meta: '我最爱的沙雕小动画！'
        },
        {
            name: 'BanG Dream! 2nd Season',
            coverImage: '/img/bangumi/bd2nd.jpg',
            releaseDate: '2019/1/1',
            link: 'https://anime.bang-dream.com/2nd/',
            meta: 'Main Visual就用了3D是怎么回事？'
        },
        {
            name: 'BanG Dream! 3rd Season',
            coverImage: '/img/bangumi/bd2nd.jpg',
            releaseDate: '2019/10/1',
            link: '',
            meta: ''
        }
    ]
}

export default siteConfig