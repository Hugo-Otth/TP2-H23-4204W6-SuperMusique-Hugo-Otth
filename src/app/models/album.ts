import { Song } from './song';
export class Album{
    constructor(public id : string, public name : string, public imageUrl : string, public song : Song[]){}
}