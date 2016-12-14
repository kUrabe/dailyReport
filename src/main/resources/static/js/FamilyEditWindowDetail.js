/**
 * ファイル名：	FamilyEditWindowDetail.js
 * 概要：		家族構成編集画面系の処理を集めたクラスを定義したファイル。
 * 作成日：	2016/12/14
 * 作成者：	k.urabe
 * path：		js/TopWindowDetail.js
 */

/**
 * クラス名：	FamilyEditWindowDetail
 * 概要：		家族構成編集画面系の処理を集めたクラス。WindowDesignクラスを継承する。
 * 作成日：	2016/12/14
 * 作成者：	k.urabe
 */
function FamilyEditWindowDetail() {
	
	WindowDesign.call(this);	//スーパークラスのコンストラクタを呼ぶ
	
	
	
}

FamilyEditWindowDetail.prototype = new WindowDesign();
//サブクラスのコンストラクタを有効にする
FamilyEditWindowDetail.prototype.constructor = WindowDesign;