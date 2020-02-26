import WhitelistService from "../services/whitelist-service";

let whitelistedUrls: Array<string> = new WhitelistService().getWhitelistedUrls();

chrome.webNavigation.onCompleted.addListener(() => {
    chrome.tabs.getSelected((tab?: chrome.tabs.Tab) => {
        if (tab && tab.id) {
            chrome.storage.sync.get([tab.url], (items: any) => {
                let url: string = (typeof tab.url === "string") ? tab.url : "";

                if (url !== "") {
                    let timesSeen: number = (items[url]) ? ++items[url]  : 1;
                    let item: any = {}
                    item[url] = timesSeen;
                    chrome.storage.sync.set(item, () => {});
                }
            });
        }
    });
},
{
    url: whitelistedUrls.map((url: string) => {
        return { urlMatches: url }
    })
});