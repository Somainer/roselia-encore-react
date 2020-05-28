import { TrackInfo, SupportedLanguages, MemberInfo, MultiLanguageAttribute } from '../protocols/encore';
import * as Helpers from '../protocols/helpers'
import * as FileSaver from 'file-saver'

interface IRoseliaEvent {
    summary: string
    start: any
    end: any
    allDay: boolean
    description: string
    repeat?: {
        frequent: "SECONDLY" | "MINUTELY" | "HOURLY" | "DAILY"  | "WEEKLY" | "MONTHLY" | "YEARLY"
        interval: number
    }
    url?: string
}
export class NaiveRoseliaiCal {
    private beginTemplate = (body: string) => `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Roselia.moe//Encore
CALSCALE:GREGORIAN
${body}
END:VCALENDAR
`
    private eventTemplate = ({summary, start, end, allDay, description, repeat, url}: IRoseliaEvent) => `
BEGIN:VEVENT
SUMMARY:${summary}
DTSTART;VALUE=DATE${allDay ? '' : '-TIME'}:${start}
DTEND;VALUE=DATE${allDay ? '' : '-TIME'}:${end}
DTSTAMP;VALUE=DATE${allDay ? '' : '-TIME'}:${start}
UID:${start}@encore.roselia.moe
DESCRIPTION:${description}
${repeat ? ('RRULE:FREQ='+repeat.frequent.toUpperCase() + ';INTERVAL=' + repeat.interval) : ''}
${url ? ('URL;VALUE=URI:' + encodeURI(url)) : ''}
END:VEVENT
`
    private events: IRoseliaEvent[] = []
    public makeCalendar(events: IRoseliaEvent[]) {
        return this.beginTemplate(events.map(this.eventTemplate).join('\n'))
    }

    public formatDate = (d: Date) => d.toISOString().split('T')[0].replace(/-/g, '')

    public formatDateFromString = (d: string | Date, delta: number = 0) => {
        try {
            const date = new Date(d)
            date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
            return this.formatDate(new Date(date.getTime() + delta * 24*60*60*1000))
        } catch {
            if(typeof d !== 'string') return this.formatDate(d) 
            return d.replace(/-/g, '').replace(/\//g, '')
        }
    }

    public toString() {
        return this.makeCalendar(this.events).replace('\n\n', '\n').trim()
    }

    private addEvent(event: IRoseliaEvent | IRoseliaEvent[]) {
        if (event instanceof Array) {
            event.forEach(ev => this.addEvent(ev))
        } else {
            this.events.push(event)
        }
    }

    public addTrackRelease(track: TrackInfo, language: SupportedLanguages, url?: string) {
        this.addEvent({
            summary: track.title,
            start: this.formatDateFromString(track.releaseDate),
            end: this.formatDateFromString(track.releaseDate, 1),
            allDay: true,
            description: `${track.displayId || (track.id + Helpers.getPositionByNum(track.id))} ${track.type}: ${track.title} ${Helpers.getLanguageAttribute(
                {
                    jp: '発売',
                    cn: '发售',
                    en: 'released'
                }, language
            )}!`,
            url
        })
    }

    public addMemberBirthday(member: MemberInfo, language: SupportedLanguages, url: string) {
        const getLanguage = (mlt: MultiLanguageAttribute | MultiLanguageAttribute[]) => Helpers.getLanguageAttribute(Helpers.getLastLanguageAttribute(mlt), language)
        
        const dt = Helpers.tryParseDateWithoutYear(member.birthday)
        this.addEvent({
            summary: getLanguage(member.name) + getLanguage({
                cn: '的生日',
                en: "'s birthday",
                jp: 'のお誕生日'
            }),
            start: this.formatDateFromString(dt),
            end: this.formatDateFromString(dt, 1),
            allDay: true,
            description: `${member.role}.${getLanguage(member.name)}. CV: ${getLanguage(member.CVName)}`,
            repeat: {
                frequent: 'YEARLY',
                interval: 1
            },
            url
        })
    }

    public getBlob () {
        return new Blob([this.toString()], {
            type: 'text/calendar'
        })
    }

    public async getBlobAsync () {
        return this.getBlob()
    }

    public async getBlobUrl() {
        const blob = await this.getBlobAsync()
        return URL.createObjectURL(blob);
    }

    public releaseBlobUrl(url: string) {
        URL.revokeObjectURL(url);
    }

    public async downloadCalendar(fileName: string) {
        const blob = await this.getBlobAsync()
        FileSaver.saveAs(blob, fileName)
    }

    public async dummyDownload(fileName: string) {
        const href = await this.getBlobUrl()
        const link = document.createElement('a')
        link.download = fileName
        link.href = href
        link.click()
        setTimeout(() => this.releaseBlobUrl(href), 4e4)
        // this.downloadCalendar(fileName)
    }

    public getDataURLAsync (): Promise<string> {
        return new Promise(r => {
            const fr = new FileReader
            fr.addEventListener('load', () => r(fr.result as string))
            fr.readAsDataURL(this.getBlob())
        })
    }
}