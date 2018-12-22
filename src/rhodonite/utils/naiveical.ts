import { TrackInfo, SupportedLanguages } from '../protocols/encore';
import * as Helpers from '../protocols/helpers'

interface IRoseliaEvent {
    summary: string
    start: any
    end: any
    allDay: boolean
    description: string
}
export class NaiveRoseliaiCal {
    private static beginTemplate = (body: string) => `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Roselia//Track/Release
${body}
END:VCALENDAR
    `
    private static eventTemplate = ({summary, start, end, allDay, description}: IRoseliaEvent) => `
BEGIN:VEVENT
SUMMARY:${summary}
DTSTART;VALUE=DATE${allDay ? '' : '-TIME'}:${start}
DTEND;VALUE=DATE${allDay ? '' : '-TIME'}:${end}
DTSTAMP;VALUE=DATE${allDay ? '' : '-TIME'}:${start}
UID:${start}@encore.roselia.moe
DESCRIPTION:${description}
END:VEVENT
    `
    private events: IRoseliaEvent[] = []
    public static makeCalendar(events: IRoseliaEvent[]) {
        return this.beginTemplate(events.map(this.eventTemplate).join('\n'))
    }

    public formatDate = (d: Date) => d.toISOString().split('T')[0].replace(/-/g, '')

    public formatDateFromString = (d: string, delta: number = 0) => {
        try {
            const date = new Date(d)
            date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
            return this.formatDate(new Date(date.getTime() + delta * 24*60*60*1000))
        } catch {
            return d.replace(/-/g, '').replace(/\//g, '')
        }
    }

    public toString() {
        return NaiveRoseliaiCal.makeCalendar(this.events)
    }

    public addTrackRelease(track: TrackInfo, language: SupportedLanguages) {
        this.events.push({
            summary: track.title,
            start: this.formatDateFromString(track.releaseDate),
            end: this.formatDateFromString(track.releaseDate, 1),
            allDay: true,
            description: `Roselia ${track.displayId || (track.id + Helpers.getPositionByNum(track.id))} ${track.type}: ${track.title} ${Helpers.getLanguageAttribute(
                {
                    jp: '発売',
                    cn: '发售',
                    en: 'released'
                }, language
            )}!`
        })
    }

    public getBlob () {
        return new Blob([this.toString()], {
            type: 'text/calendar'
        })
    }

    public getBlogUrl(f: (s: string) => void) {
        new Promise(resolve => resolve(this.getBlob())).then(blob => URL.createObjectURL(blob)).then(url => {
            f(url)
            return url
        }).then(url => URL.revokeObjectURL(url))
    }
}