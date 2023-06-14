import fetch from "node-fetch";
import { IDocuNotionContext, IPlugin, Log } from "@sillsdev/docu-notion";
import { exit } from "process";

export async function getBloomPUBReplacement(
  matchedString: string,
  parseBookId: string,
  bookPageUrlSubDomain: string
): Promise<string> {
  const harvesterUrl = await getHarvesterUrl(
    matchedString,
    parseBookId,
    bookPageUrlSubDomain
  );
  if (harvesterUrl) {
    // It would also be possible to just use the /player page for the book (at the cost of including all of blorg):
    //output: `<iframe width="100%" height="450px" allow="fullscreen" allowFullScreen={true}
    // src="https://bloomlibrary.org/player/$1_uri_encoded"></iframe>

    // For now, I've decided not to let bloom-player report analytics (`independent=false`).
    // There are too many questions such as:
    // * Do we even want **any** book reading analytics from our docs site?
    // * What should `host` be? (I've set it to docs.bloomlibrary.org for now.)
    // * How would we properly distinguish or filter out dev books? Or does it matter?
    const iframeElement = `<iframe width="100%" height="450px" allow="fullscreen" allowFullScreen={true}
  src="https://bloomlibrary.org/bloom-player/bloomplayer.htm?url=PUT_URL_HERE&initiallyShowAppBar=false&paused=true&allowToggleAppBar=true&independent=false&host=docs.bloomlibrary.org"></iframe>`;

    return iframeElement.replace(
      "PUT_URL_HERE",
      // We have to decode it because docusaurus (I think?) will encode it again.
      decodeURIComponent(harvesterUrl)
    );
  } else {
    return undefined;
  }
}

// ask the harvester for a url we can use for embedding a bloom-player that shows this book
async function getHarvesterUrl(
  matchedString: string,
  parseBookId: string,
  bookPageUrlSubDomain: string
): Promise<string | undefined> {
  try {
    let parseServerUrl = "https://server.bloomlibrary.org/parse/classes/books";
    let parseAppId = "R6qNTeumQXjJCMutAJYAwPtip1qBulkFyLefkCE5";
    if (bookPageUrlSubDomain.includes("dev")) {
      parseServerUrl =
        "https://dev-server.bloomlibrary.org/parse/classes/books";
      parseAppId = "yrXftBF6mbAuVu3fO6LnhCJiHxZPIdE7gl1DUVGR";
    }

    const response = await fetch(
      `${parseServerUrl}/${parseBookId}?keys=baseUrl`,
      {
        headers: {
          "X-Parse-Application-Id": parseAppId,
        },
      }
    );

    const { baseUrl } = (await response.json()) as {
      baseUrl: string;
    };
    if (!baseUrl) {
      Log.error(
        `Failed to get baseUrl for book id='${parseBookId}'. The incoming matchedString='${matchedString}'. The full server response was: ${JSON.stringify(
          response,
          null,
          2
        )})}`
      );
      exit(1);
    }

    // This logic was copied from blorg
    let folderWithoutLastSlash = baseUrl;
    if (baseUrl.endsWith("%2f")) {
      folderWithoutLastSlash = baseUrl.substring(0, baseUrl.length - 3);
    }
    const index = folderWithoutLastSlash.lastIndexOf("%2f");
    const pathWithoutBookName = folderWithoutLastSlash.substring(0, index);
    const baseHarvesterUrl = pathWithoutBookName
      .replace("BloomLibraryBooks-Sandbox", "bloomharvest-sandbox")
      .replace("BloomLibraryBooks", "bloomharvest");
    // END logic copied from blorg

    return baseHarvesterUrl + "/bloomdigital%2findex.htm";
  } catch (e) {
    Log.error("Failed to get harvester url: ");
    Log.error((e as Error).message);
    return undefined;
  }
}

const embeddedBookPattern =
  /\[.*\]\(.*\/\/(.*)bloomlibrary\.org.*player\/(.+)\)/;

export const bloomBookEmbedding: IPlugin = {
  name: "BloomBookEmbedding",
  regexMarkdownModifications: [
    {
      regex: embeddedBookPattern,
      getReplacement: async (
        context: IDocuNotionContext,
        matchRegexArray: RegExpExecArray
      ) => {
        Log.verbose(`BloomBookEmbedding plugin given: "${matchRegexArray[0]}"`);
        const match = embeddedBookPattern.exec(matchRegexArray[0]);
        if (!match) {
          throw new Error(
            `BloomBookEmbedding should never get a string that doesn't match its regex (${embeddedBookPattern}).`
          );
        }
        const bookPageUrlSubDomain = match[1];
        const parseBookId = match[2];
        return await getBloomPUBReplacement(
          matchRegexArray[0],
          parseBookId,
          bookPageUrlSubDomain
        );
      },
    },
  ],
};
