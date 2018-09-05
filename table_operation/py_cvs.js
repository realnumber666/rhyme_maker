/**
 * 18.9.5 ray
 * pack a function to transform 2 word's data to pinyin
 * need to update to transform more word's data
 * 声母为y,w的暂时无法识别
 */
var r2p = require('pinyin')

function cvs(raw){//spell_2为完整拼音,spell_1为声母
    let spell_2 = r2p(raw,{style: r2p.STYLE_NORMAL});
    let spell_1 = r2p(raw,{style: r2p.STYLE_INITIALS});
    let result_1 = '';
    //low为声母长度，high为完整拼音长度
    let low_1 = spell_1[0][0].length;
    let high_1 = spell_2[0][0].length;
    //在完整拼音中从声母后一位开始拼接，得到韵母
    for(let i = low_1;i <high_1;i++){
        result_1 += spell_2[0][0][i];
    }

    let result_2 = '';
    let low_2 = spell_1[1][0].length;
    let high_2 = spell_2[1][0].length;

    for(let i = low_2;i <high_2;i++){
        result_2 += spell_2[1][0][i];
    }
    //拼接两个字的韵母
    spell_result = String(result_1 +" "+ result_2)
    return spell_result;
    //console.log(spell_result)
}
exports.cvs = cvs;

