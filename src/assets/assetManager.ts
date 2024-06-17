import { BricksGame } from "../game/scenes/Game";

type AssetDefinition = {
    url: string,
    key: string
}

const defs = new Map<string,AssetDefinition>();

const register = (
    key: string,
    url: string
) => {
    defs.set( key, { key, url } );
}

register("block", "assets/sbornik.png");
register("manual", "assets/manual.png");
register( "kacovsky", "assets/kacovsky-palice.png" );
register( "sbornik", "assets/sbornik.png" );
register( "kielbusova", "assets/kielbusova-2.png" );
register( "varecka", "assets/kielbusova-3.png" );

export class AssetManager {

    static assets = defs;

    static registerToScene( scene: BricksGame ) {
        AssetManager.assets.forEach( item => {
            scene.load.image( item.key, item.url );
        } );
    }

    static get( key: string ) {
        return AssetManager.assets.get( key );
    }

    static getUrl( key: string ) {
        return AssetManager.get( key )?.url;
    }

}