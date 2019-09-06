import ITeamClient from "./client/ITeamClient";

export default class Loader {
    public static team(path: string): ITeamClient {
        return require(process.cwd() + "/" + path);
    }

    public static roboConfig() { 
        return require(process.cwd() + "/robots.json");
    }
}