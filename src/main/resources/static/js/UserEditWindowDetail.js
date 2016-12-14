/**
 * ファイル名：	UserEditWindowDetail.js
 * 概要：		ユーザ編集画面系の処理を集めたクラスを定義したファイル。
 * 作成日：	2016/12/14
 * 作成者：	k.urabe
 * path：		js/TopWindowDetail.js
 */

/**
 * クラス名：	UserEditWindowDetail
 * 概要：		ユーザ編集画面系の処理を集めたクラス。WindowDesignクラスを継承する。
 * 作成日：	2016/12/14
 * 作成者：	k.urabe
 */
function UserEditWindowDetail() {
	
	WindowDesign.call(this);	//スーパークラスのコンストラクタを呼ぶ
	
	
	
}

UserEditWindowDetail.prototype = new WindowDesign();
//サブクラスのコンストラクタを有効にする
UserEditWindowDetail.prototype.constructor = WindowDesign;