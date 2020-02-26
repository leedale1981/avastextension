export default class WhiteListService {
    public getWhitelistedUrls(): Array<string> {
        return [
            "chrome://extensions/",
            "http://www.leedale.me/",
            "https://www.avast.com/",
        ]
    }

    public getCurrentSite(): Promise<SiteData> {
        return new Promise<SiteData>((resolve, reject) => {
            chrome.tabs.getSelected((tab?: chrome.tabs.Tab) => {
                if (tab && tab.id) {
                    let url: string = (typeof tab.url === "string") ? tab.url : "";
                    let title: string = (typeof tab.title === "string") ? tab.title : ""

                    this.getTimesSeen(url)
                    .then((timesSeen) => {
                        resolve({
                            url,
                            title,
                            isWhitelisted: this.isWhitelistedUrl(url),
                            timesSeen
                        });
                    })
                }
            });
        });
    }

    public isWhitelistedUrl(url: string): boolean {
        let wlUrls = this.getWhitelistedUrls();

        for (let index = 0; index < wlUrls.length; index++) {
            if (url.indexOf(wlUrls[index]) !== -1) {
                return true;
            }
        }

        return false;
    }

    public getTimesSeen(url: string): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            chrome.storage.sync.get([url], (items: any) => {
                if (url !== "") {
                    resolve(items[url]);
                }
            });
        });
    }
}

export class SiteData {
    public url: string = "";
    public title: string = "";
    public isWhitelisted: boolean = false;
    public timesSeen: number = 0;
}