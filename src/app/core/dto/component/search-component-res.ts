import { PageInfo } from "../../api/api-response";
import { DetailComponentRes } from "./component-res";

export interface SearchComponentRes extends PageInfo {
    components: DetailComponentRes[];
}