type JLiteral = number | string | boolean | undefined | null
interface JObject {
    [attr: string]: RJson
}
type RJson = JLiteral | JObject | JArray

type JArray = JLiteral[] | JObject[]

export class RoseliaStorage {
    private key: string
    private storage: Storage
    constructor(key: string, storage = localStorage) {
        this.key = key
        this.storage = storage
    }

    private get payload (): object {
        return JSON.parse(this.storage.getItem(this.key) || '{}')
    }

    private set payload (pld: object) {
        this.storage.setItem(this.key, JSON.stringify(pld))
    }

    public getItem(key: string) {
        const payload = this.payload
        return payload && payload[key]
    }

    public setItem(key: string, value: RJson) {
        this.payload = {
            ...this.payload,
            [key]: value
        }
    }
}
