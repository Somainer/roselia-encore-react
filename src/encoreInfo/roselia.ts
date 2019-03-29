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
        cvPicNum: 2,
        external: [
            {
                title: '',
                hidden: true,
                content: '这只企鹅又能唱歌，又能摔跤，还能revue真厉害'
            }
        ],
        memberPicNum: 3
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
        encoreColor: "#00aabc",
        cvPicNum: 2,
        memberPicNum: 3
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
        ],
        memberPicNum: 3
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
        },
        memberPicNum: 3
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
        ],
        memberPicNum: 3,
        cvPicNum: 2
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
            },
            {
                description: 'Apple Music',
                link: 'https://itunes.apple.com/cn/album/black-shout-ep/1226412741'
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
            },
            {
                description: 'Apple Music',
                link: 'https://itunes.apple.com/cn/album/re-birth-day-ep/1253751369'
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
            },
            {
                description: 'Apple Music',
                link: 'https://itunes.apple.com/cn/album/nessyoku-starmine-ep/1278805653'
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
            },
            {
                description: 'Apple Music',
                link: 'https://itunes.apple.com/cn/album/oneness-ep/1317171039'
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
            },
            {
                description: 'Apple Music',
                link: 'https://itunes.apple.com/cn/album/opera-of-the-wasteland-ep/1356941941'
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
            },
            {
                description: 'Apple Music',
                link: 'https://itunes.apple.com/cn/album/r-ep/1407582593'
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
            },
            {
                description: "NetEase",
                link: "https://music.163.com/album?id=74858139"
            },
            {
                description: 'Apple Music',
                link: 'https://itunes.apple.com/cn/album/brave-jewel-single/1444590568'
            }
        ],
        external: [{
            title: "P.S.",
            content: ["这首单曲还是19年的第二季的OP，啊真香", "双OP好评"]
        }],
        hasLimitedEdition: true
    },
    {
        id: 8,
        title: "Safe and Sound",
        track: ["Safe and Sound", "PASSIONATE ANTHEM", "Safe and Sound -instrumental-", "PASSIONATE ANTHEM -instrumental-"],
        releaseDate: "2019/2/20",
        links: [
            {
                description: "BanG Dream",
                link: "https://bang-dream.com/discographies/739"
            },
            {
                description: 'NetEase',
                link: 'https://music.163.com/album?id=75639892'
            },
            {
                description: 'Apple Music',
                link: 'https://itunes.apple.com/cn/album/safe-and-sound-single/1450478848'
            }
        ],
        external: [
            {
                title: "快住手！",
                content: [
                    "2月20号7CD10BD，我的钱包要空了。",
                    "My wallet is not safe and sound."
                ]
            }
        ],
        hasLimitedEdition: true
    },
    {
        id: 9,
        title: 'FIRE BIRD',
        track: ['FIRE BIRD', 'Ringing Bloom', 'FIRE BIRD -instrumental-', 'Ringing Bloom -instrumental-'],
        releaseDate: '2019/07/24',
        links: [
            {
                description: 'BanG Dream',
                link: 'https://bang-dream.com/discographies/963'
            },
            {
                description: '萌娘百科',
                link: 'https://zh.moegirl.org/zh-cn/Ringing_Bloom'
            }
        ],
        external: [
            {
                title: '',
                hidden: true,
                content: ['Rinrin Bloom']
            },
            {
                title: 'GBP 相关',
                content: [
                    '因为是在游戏中出现的原创歌曲，我暂且认为是9单的歌曲（PA：明明是我先来的，怎么就成CW曲了？）（还真是CW曲草（日本語意味））',
                    '这首歌根本就不能在手机上玩',
                    '本人比较菜，只能用全奶才能在手机和pad上分别clear（FC有生之年吧）',
                    '物量冠军，相比之下GK是儿歌'
                ]
            },
            {
                title: '1094 Note',
                content: ['让我们记住这个鬼畜的EX物量', 'C/W曲尚且如此，听着感觉FIRE BIRD难度也不会低'],
                hidden: false
            }
        ],
        hasLimitedEdition: false
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
            },
            {
                description: 'Apple Music',
                link: 'https://itunes.apple.com/cn/album/anfang/1371270926'
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
    title: 'Roselia Encore',
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
                cn: 'GBP相关',
                en: 'Girls Band Party Related',
                jp: 'ガルパコレクション'
            },
            trackType: 'cover',
            trackList: [
                {
                    id: 1,
                    displayId: '1st Cover',
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
                },
                {
                    id: 2,
                    displayId: 'Pico',
                    title: '香澄×蘭×彩×友希那×こころ「ピコっと！パピっと！！ガルパ☆ピコ！！！」',
                    track: ["ピコっと！パピっと！！ガルパ☆ピコ！！！", "クインティプル☆すまいる", "ピコっと！パピっと！！ガルパ☆ピコ！！！ -instrumental-", "クインティプル☆すまいる -instrumental-"],
                    releaseDate: "2018/08/22",
                    type: 'single',
                    links: [
                        {
                            description: "BanG Dream",
                            link: "https://bang-dream.com/discographies/396"
                        },
                        {
                            description: "NetEase",
                            link: "https://music.163.com/album?id=72382741"
                        }
                    ]
                },
                {
                    id: 3,
                    displayId: '2nd Cover',
                    title: 'バンドリ！ ガールズバンドパーティ！カバーコレクションVol.2',
                    track: ['君じゃなきゃダメみたい/Poppin\'Party', 'DAYS/Poppin\'Party', 'Redo/Afterglow', 'ロストワンの号哭/Afterglow', 'ハッピーシンセサイザ/Pastel＊Palettes', '世界は恋に落ちている/Pastel＊Palettes', '深愛/Roselia', 'シャルル/Roselia', 'GO! GO! MANIAC/ハロー、ハッピーワールド！', 'Dragon Night/ハロー、ハッピーワールド！'],
                    releaseDate: '2019-03-16',
                    type: 'cover',
                    links: [
                        {
                            description: "BanG Dream",
                            link: "https://bang-dream.com/discographies/742"
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
            return `/img/member_${m.name.en.split(' ')[1].toLowerCase()}${
                Helper.compose(Helper.randomGenerate, n => n ? n.toString() : '')(m.memberPicNum || 0)
            }.jpg`
        },
        cvImageGetter (m) {
            return `/img/cv_${Helper.getLastLanguageAttribute(m.CVName).en.split(' ')[1].toLowerCase()}${
                Helper.compose(Helper.randomGenerate, n => n ? n.toString() : '')(m.cvPicNum || 0)
            }.jpg`
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
            meta: '不知道3D动画会有怎样的表现，拭目以待。'
        },
        {
            name: 'BanG Dream! 3rd Season',
            coverImage: '/img/bangumi/bd2nd.jpg',
            releaseDate: '2019/10/1',
            link: '',
            meta: ''
        }
    ],
    externalLinks: [
        {
            description: "BanG Dream!导航站",
            link: "https://www.bangdream.moe/"
        },
        {
            description: "BanG Dream! 查卡器",
            link: "https://bangdream.ga/"
        },
        {
            description: "BanG Dream! 百科",
            link: "https://www.bangdreamwiki.com/"
        },
    ]
}

export default siteConfig