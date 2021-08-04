

import updateStucodetable from './updateStucodetable'
import queryByskuNameOrskuCode from './queryByskuNameOrskuCode'
import addStucodetable from './addStucodetable'

import urls from "../../url"


const java = urls.p8088


export default {
    stucode_queryByskuNameOrskuCode: queryByskuNameOrskuCode(java),
    stucode_updateStucodetable: updateStucodetable(java),
    stucode_addStucodetable: addStucodetable(java)
}
