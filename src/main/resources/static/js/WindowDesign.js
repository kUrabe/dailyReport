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
	BaseWindow.call(this);	//スーパークラスのコンストラクタを呼ぶ
	
	this.json;				// 取得したjsonを格納
	this.dom;				// 取得したTHMLを格納
	
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
	// selectorの後に引数としてgrand_parent_content_idを追加検討
	this.createContentIndex = function(selector, parent_content_id, indent = 0) {
		
		var jsonLen;		// jsonの長さを保持するための変数
		
		// JSONの長さを取得
		jsonLen = this.json.length;
		
		// jsonが取得出来ているか検証する
		if(this.json !== null && this.json !== undefined && jsonLen !== 0) {
			
			// indentで1階層目か判定する
			if(indent == 0) {
				// 1階層目なので見出し行のタグ一式を追加する
				$(selector).append(TAG_REPORT_INDEX_LINE);
			}
			
			// TODO:【未実装】子要素の呼び出しについて、今のままでは適切でない。
			// JSONの行要素を走査する
			for(var key in this.json) {
				// indent数分、ループしてテーブルのインデントをずらす
				for(var i = 0; i < indent; i++) {
					// indent用のタグを挿入する
					$(selector).append(TAG_INDENT);
				}
				
				// ブロックエリアのタグを追加する
				$(selector + SELECTOR_LAST).append(TAG_BLOCK_AREA);
				// 行(ブロック)内のセレクタを取得する
				var $_blockSelector = $(selector + MARK_SPACE + SELECTOR_PARENT_AREA_LAST)
				
				// TODO:【未実装】レポートの概要を展開する際は、複数のコンテンツIDがJSONに含まれる。
				// TODO:【未実装】それにも関わらず、受け取らなければならないので、ロジックが矛盾する
				// TODO:【未実装】暫定として0を引数として受け取り、0の際は子を検証しない動きとする
				// 対象レコードが子要素であるか検証する
				//if(parent_content_id < this.json[key].parent_content_id && parent_content_id !== 0) {
					// 子要素を出力するため再帰呼び出しを行う。
					//this.createContentIndex(selector, this.json[key].parent_content_id, indent + 1)
				//}
				
				// 行開始のタグを挿入する(アコーディオンボタンクラス名付き)
				$_blockSelector.append(TAG_LINE_START);
				// 追加した行開始タグにクラス名を追加する
				$_blockSelector.addClass(STR_LINE + key);
				
				// 1行概要を追加していく箇所のセレクタを取得する
				var $_lineSelector = $(selector + MARK_SPACE + SELECTOR_PARENT_AREA_LAST + MARK_SPACE + SELECTOR_CONTENT_INDEX);
				// 行内の各項目のタグを追加する
				$_lineSelector.append(TAG_REPORT_LINE);
				
				// JSONの列要素を走査する
				for(var keyIn in this.json[key]) {
					// 挿入された項目タグの名前と一致させながら値をセットする
					$(selector + MARK_SPACE + SELECTOR_PARENT_AREA_LAST + MARK_SPACE + SELECTOR_CONTENT_INDEX + MARK_SPACE + SELECTOR_DIV_NAME_START + keyIn + SELECTOR_DIV_NAME_END).text(this.json[key][keyIn]);
				}

				// 展開行に対するアコーディオン展開部分を作成する
				$_blockSelector.append(TAG_REPORT_ACCORDION);
				// アコーディオンイベントを行単位で設定する
				this.managementAccordion(SELECTOR_LINE + key + MARK_SPACE + SELECTOR_B_ACCORDION, SELECTOR_LINE + key + MARK_SPACE + SELECTOR_ACCORDION_AREA);
			}

		// データが取得できていない旨を所定の位置に表示する
		} else {
			// 検索結果が0件の旨のメッセージを表示する
			$(selector + MARK_SPACE + SELECTOR_SERACH_MESSAGE).text(MESSAGE_SEARCH_NOT_DATA);
		}
	}
	
	/**
	 * 関数名：	getJsonData
	 * 概要：		サーバに対してリクエストを送り、結果としてJSONを得る
	 * 引数：		String:path		リクエスト先のURL
	 * 			json			jsonの連想配列
	 * 			String:type		リクエストの種類。サーバ側でマッピングに使用
	 * 戻り値：	なし
	 * 作成日：	2016/11/23
	 * 作成者：	k.urabe
	 */
	this.getJsonData = function(path, json, type) {
		
		var map;		// json連想配列を文字列かしたものを格納するための変数
		var tmp;		// 一時的にJSONほ保持してメンバのjsonに格納する。
		
		// json連想配列から、JSON文字列に変換、取得する
		map = JSON.stringify(json);
		
		// ajax通信を行う
		$.ajax({
			// リクエストURL
			url: path,
			// 取得ファイルの形式をJSONに指定する
			dataType: 'JSON',
			// postメソッドで通信する
			type: 'POST',
			// 同期通信を行う
			async: false,
			// サーバへ渡すデータを連想配列にする
			data: {crud:type,json:map},
			// キャッシュを無効にする
			cache: false,
			// 通信成功時の処理
			success: function(json) {
				// 取得したjsonをメンバへ格納する
				tmp = json;
			},
			error: function(xhr, status, error) {
				// TODO:【未実装】メッセージおよび例外処理について未実装
				// 処理失敗の旨を出力する
				alert(MESSAGE_AJAX_ERROR);
			}
		});
		
		// 取得したJSONをメンバのJSONへ格納する
		this.json = tmp;
		
	}
	
	/**
	 * 関数名：	getHtmlData
	 * 概要：		サーバに対してリクエストを送り、結果としてHTMLを得る
	 * 引数：		String:path		リクエスト先のURL
	 * 戻り値：	なし
	 * 作成日：	2016/11/23
	 * 作成者：	k.urabe
	 */
	this.getHtmlData = function(path) {
		
		// ajax通信を行う
		$.ajax({
			// リクエストURL
			url: path,
			// 取得ファイルの形式をHTMLに指定する
			dataType: 'HTML',
			// postメソッドで通信する
			type: 'POST',
			// 同期通信を行う
			async: false,
			// サーバへ渡すデータを連想配列にする
			data: {anotherWidow:''},
			// キャッシュを無効にする
			cache: false,
			// 通信成功時の処理
			success: function(html) {
				// 取得したhtmlをメンバへ格納する
				this.dom = html;
			},
			error: function(xhr, status, error) {
				// TODO:【未実装】メッセージおよび例外処理について未実装
				// 処理失敗の旨を出力する
				alert("");
			}
		});
		
	}
	
	/**
	 * 関数名：	createReportDetail
	 * 概要：		日報の概要に対する内容を展開する
	 * 引数：		selector		
	 * 戻り値：	なし
	 * 作成日：	2016/11/23
	 * 作成者：	k.urabe
	 */
	this.createReportDetail = function(selector) {
		
		var userFlag = STR_FALSE;		// 本人ならtrue、他人の日報ならfalse
		var user;						// ログイン中のユーザIDを保管

		// JSONの長さを取得
		jsonLen = this.json.length;
		
		// jsonが取得出来ているか検証する
		if(this.json !== null && this.json !== undefined && jsonLen !== 0) {
			
			// ユーザID（ログインユーザ）をセットする
			user = $(SELECTOR_TOP_MENU + MARK_SPACE + SELECTOR_USER_ID).text();
			// これから走査するレコードがログインユーザの日報かどうかを判定する
			if(user == $(selector).parent().parent().children(SELECTOR_CONTENT_INDEX).children(SELECTOR_USER_ID).text()) {
				userFlag = STR_TRUE;
			} else {
				userFlag = STR_FALSE;
			}
			false
			// JSONの行要素を走査する
			for(var key in this.json) {
				
				// ブロックエリアのタグを埋める
				$(selector).append(TAG_BLOCK_AREA);
				// 行(ブロック)内のセレクタを取得する
				var $_blockSelector = $(selector).children(SELECTOR_PARENT_AREA_LAST);
				
				// 追加した行開始タグにクラス名を追加する
				$_blockSelector.addClass(STR_LINE + key);
				// 行内の各項目のタグを追加する
				$_blockSelector.append(TAG_REPORT_DETAIL_LINE);
				
				// JSONの列要素を走査する
				for(var keyIn in this.json[key]) {
					// 挿入された項目タグの名前と一致させながら値をセットする
					$_blockSelector.children(SELECTOR_DIV_NAME_START + keyIn + SELECTOR_DIV_NAME_END).text(this.json[key][keyIn]);
				}
				
			}

			// 出力したレコードの投稿ユーザに合わせてボタンを出力する（userFlag）
			if(userFlag == STR_TRUE) {
				// ログインユーザ = 投稿ユーザ
				// 編集ボタンを追加する
				$(selector).append(TAG_EDIT_BUTTON);
				// 削除ボタンを追加する
				$(selector).append(TAG_DELETE_BUTTON);
			} else {
				// いいねボタンを追加する
				$(selector).append(TAG_FAVORITE_BUTTON);
				// 未読にするボタンを追加する
				$(selector).append(TAG_NO_READ_BUTTON);
			}
			
			// 各ボタンのイベント登録(アコーディオンの内部には、タグで追加した際にコメントするボタンと、閉じるボタンが入っている)
			
			// 閉じるボタンのイベントを登録する
			this.managementAccordion($(selector).parent().children(SELECTOR_B_ACCORDION), $(selector).parent())
			
		}
		
	}
	
	/**
	 * 関数名：	createCommentDetail
	 * 概要：		コメント概要に紐付く詳細（最初の数行）を展開する
	 * 引数：		selector		
	 * 戻り値：	なし
	 * 作成日：	2016/11/23
	 * 作成者：	k.urabe
	 */
	this.createCommentDetail = function(selector) {
		
		// HTMLの対象エリア内を走査する
		// TODO:【セレクタ】コメント概要を囲んでいるエリアがセレクタで渡される想定(blockArea?)
		// TODO:【セレクタ】その配下の
		$(selector).each(function(index) {
			// JSON内の走査時にHTMLのセレクタを指定出来るよう変数へ待避する
			thisElem = this;
			
			// JSON内を走査して、当該コメント概要に紐付く内容を探す
			$.each(this.json, function(key, value) {
				// 各行のコンテンツIDとJSON内のコンテンツIDが一致するか検証(一致ならば出力対象)
				if($(thisElem + MARK_SPACE + SELECTOR_CONTENT_ID).text() == this.json[key][KEY_CONTENT_ID]) {
					// 行の開始としてtrを挿入する
					$(thisElem).append(TAG_TR_COMMENT_START);
					// 項目の要素を出力する
					$(thisElem).append(TAG_TD_START + this.json[key][KEY_MAIN_TEXT] + TAG_TD_END).addClass(key);
					// 行終了のタグを挿入する
					$(thisElem).append(TAG_TR_END);
				}
			});
		});
		
	}
	
	/**
	 * 関数名：	getIndexTag
	 * 概要：		JSON展開時、セレクタに応じた見出し行やテーブルの開始タグを返す
	 * 引数：		selector		
	 * 戻り値：	String returnTag
	 * 作成日：	2016/11/23
	 * 作成者：	k.urabe
	 */
	this.getIndexTag = function(selector) {
		
		var returnTag;			// 返却用のtagを格納するための変数
		
		// TODO:【未実装】今後、セレクタによってタグを振り分けるために使用。
		// セレクタによって返すタグを振り分ける
		switch(selector) {
			case SELECTOR_REPORT_AREA:
				// returnTag = TAG_REPORT_AREA_START;
				break;
			default:
				// TODO:【セレクタ】デフォルトで返すものも、全体のタグ構成が見えてきたら検証し直し。
				// デフォルトとしてトップ画面のテーブルタグを返す
				returnTag = TAG_TOP_TABLE_START;
		}
		// 決定したtagを返す
		return returnTag;
	}
	
}

WindowDesign.prototype = new BaseWindow();
//サブクラスのコンストラクタを有効にする
WindowDesign.prototype.constructor = BaseWindow;