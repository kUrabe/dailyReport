/**
 * ファイル名：	WindowDesign.js
 * 概要：		画面構築に関わるサーバとのやりとり、JSONの展開処理を集めたクラスを定義したファイル。
 * 作成日：	2016/11/22
 * 作成者：	k.urabe
 * path：		js/WindowDesign.js
 */

/**
 * クラス名：	WindowDesign
 * 概要：		画面構築に関わるサーバとのやりとり、JSONの展開処理を集めたクラス。BaseWindowクラスを継承する。
 * 作成日：	2016/11/22
 * 作成者：	k.urabe
 */
function WindowDesign() {
	
	this.json;		// 取得したjsonを格納
	this.dom;		// 取得したTHMLを格納
	
	/**
	 * 関数名：	createContentIndex
	 * 概要：		トップ画面の日報見出し概要とコメントの見出しと概要を展開する
	 * 引数：		selector	データの展開先
	 * 			grand_parent_content_id		祖先のコンテンツID
	 * 			parent_content_id			親のコンテンツID
	 * 			indent		インデント(初期値0)
	 * 戻り値：	なし
	 * 作成日：	2016/11/22
	 * 作成者：	k.urabe
	 */
	// TODO:【メモ】設計ではJSONを引数で渡していたが、メンバとして保存されているので、thisで使用する
	this.createContentIndex = function(selector, grand_parent_content_id, parent_content_id, indent = 0) {
		
		// jsonが取得出来ているか検証する
		if(this.json !== null | this.json !== undefined | this.json[message]) {
			
			// セレクタに応じたテーブルの開始タグを取得して追加する
			$(selector).append(this.getIndexTag(selector));
		
		// JSONにメッセージがあれば
		} else if(this.json[message]) {
			// 検索結果が0件の旨のメッセージを表示する
			$(selector > SELECTOR_SERACH_MESSAGE).text(this.json[message]);
		}
	}
}