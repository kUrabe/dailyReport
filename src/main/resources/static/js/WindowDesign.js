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
	this.sexJudge = {};		// 性別判定用の連想配列を用意
	this.statusJudge = {};	// ユーザステータス判定用の連想配列を用意
	this.familySupport = {};	// 扶養判定用の連想配列を用意
	
	// 性別判定用の連想配列を作成する
	this.sexJudge[STR_SEX_MAN_NUM] = STR_SEX_MAN;
	this.sexJudge[STR_SEX_WOMAN_NUM] = STR_SEX_WOMAN;
	this.sexJudge[STR_SEX_OTHER_NUM] = STR_SEX_OTHER;
	// ユーザステータス判定用の連想配列を作成する
	this.statusJudge[STR_STATUS_REG_NUM] = STR_STATUS_REG;
	this.statusJudge[STR_STATUS_DEL_NUM] = STR_STATUS_DEL;
	this.statusJudge[STR_STATUS_TNP_NUM] = STR_STATUS_TNP;
	// 扶養判定用の連想配列を作成する
	this.familySupport[STR_SUPPORT_ON_NUM] = STR_SUPPORT_ON;
	this.familySupport[STR_SUPPORT_OFF_NUM] = STR_SUPPORT_OFF;
	
	
	/**
	 * 関数名：	createContentIndex
	 * 概要：		トップ画面の日報見出し概要を展開する
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
		var user;			// ログイン中のユーザIDを保管
		
		// JSONの長さを取得
		jsonLen = this.json.length;
		// ユーザID（ログインユーザ）をセットする
		user = $(SELECTOR_TOP_MENU + MARK_SPACE + SELECTOR_USER_ID).text();
		
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
				var $_blockSelector = $(selector + MARK_SPACE + SELECTOR_PARENT_AREA_LAST);
				
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
				$_blockSelector.addClass(STR_LINE + this.json[key][KEY_DB_CONTENT_ID]);
				
				// 1行概要を追加していく箇所のセレクタを取得する
				var $_lineSelector = $(selector + MARK_SPACE + SELECTOR_PARENT_AREA_LAST + MARK_SPACE + SELECTOR_CONTENT_INDEX);
				// 行内の各項目のタグを追加する
				$_lineSelector.append(TAG_REPORT_LINE);
				
				// JSONの列要素を走査する
				for(var keyIn in this.json[key]) {
					// 値を挿入するセレクタを取得する
					var $_valueSetPosition = $(selector + MARK_SPACE + SELECTOR_PARENT_AREA_LAST + MARK_SPACE + SELECTOR_CONTENT_INDEX + MARK_SPACE + SELECTOR_DIV_NAME_START + keyIn + SELECTOR_DIV_NAME_END);
					// 挿入された項目タグの名前と一致させながら値をセットする
					$_valueSetPosition.text(this.json[key][keyIn]);
// 共通処理候補				
					// 既読状態を表す項目の値がセットされたら、適切な文字列に置き換えるために状態判定を行う
					if(keyIn == KEY_READ_STATUS) {
						// 本人投稿 かつ 下書であるか検証
						if(user == this.json[key][KEY_DB_USER_ID] && this.json[key][KEY_DB_ENTRY_STATUS] & FLAG_ENTRY_STATUS_NOTE) {
							// 本人かつ下書なのでステータスの文字列を下書にする
							$_valueSetPosition.text(STR_READ_NOTE);
						// 下書以外の本人投稿であるか
						} else if(user == this.json[key][KEY_DB_USER_ID]) {
							// 本人投稿なのでステータスを文字列を本人にする
							$_valueSetPosition.text(STR_READ_MYSELF);
						// 既読であるか検証する（本人以外）
						} else if(this.json[key][KEY_READ_STATUS] & FLAG_CATEGORY_STATUS_REG) {
							// 本人以外の既読なのでステータスの文字列を既読にする
							$_valueSetPosition.text(STR_READ_ON);
						} else {
							// 本人以外の未読なのでステータスの文字列を未読にする
							$_valueSetPosition.text(STR_READ_OFF);
						}
					}
// ここまで

				}

				// 展開行に対するアコーディオン展開部分を作成する
				$_blockSelector.append(TAG_REPORT_ACCORDION);
				// アコーディオンイベントを行単位(内部に設置しているボタンも含めて)で設定する
				this.managementAccordion(SELECTOR_LINE + this.json[key][KEY_DB_CONTENT_ID] + MARK_SPACE + SELECTOR_B_ACCORDION, SELECTOR_LINE + this.json[key][KEY_DB_CONTENT_ID] + MARK_SPACE + SELECTOR_ACCORDION_AREA);
				// コメントするボタンにイベントを登録する		
				this.setClickEvent(SELECTOR_LINE + this.json[key][KEY_DB_CONTENT_ID] + MARK_SPACE + SELECTOR_B_NEW_COMMENT, this.prepareAnotherWindow, null, SELECTOR_LINE + this.json[key][KEY_DB_CONTENT_ID] + MARK_SPACE + SELECTOR_CONTENT_INDEX);
				
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
			dataType: STR_JSON,
			// postメソッドで通信する
			type: STR_POST,
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
			dataType: STR_HTML,
			// postメソッドで通信する
			type: STR_POST,
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
			// 当該コンテンツの概要情報を取得出来るセレクタを取得する
			$_contentIndex = $(selector).parent().parent().children(SELECTOR_CONTENT_INDEX);
			// これから走査するレコードがログインユーザの日報かどうかを判定する
			if(user == $_contentIndex.children(SELECTOR_USER_ID).text()) {
				userFlag = STR_TRUE;
			} else {
				userFlag = STR_FALSE;
			}

			// JSONの行要素を走査する
			for(var key in this.json) {
				
				// ブロックエリアのタグを埋める
				$(selector).append(TAG_BLOCK_AREA);
				// 行(ブロック)内のセレクタを取得する
				var $_blockSelector = $(selector).children(SELECTOR_PARENT_AREA_LAST);
				
				// 追加した行開始タグにクラス名を追加する
				$_blockSelector.addClass(STR_NUMBER + this.json[key][KEY_DETAIL_ID]);
				// 行内の各項目のタグを追加する
				$_blockSelector.append(TAG_REPORT_DETAIL_LINE);
				
				// JSONの列要素を走査する
				for(var keyIn in this.json[key]) {
					// 挿入された項目タグの名前と一致させながら値をセットする
					$_blockSelector.children(SELECTOR_DIV_NAME_START + keyIn + SELECTOR_DIV_NAME_END).text(this.json[key][keyIn]);
				}
				
			}

			// 出力したレコードの投稿ユーザに合わせてボタンを出力する（userFlag） もしくは管理者権限を有している
			if(userFlag == STR_TRUE || this.getUserAuth() == STR_SUCCESS) {
				// ログインユーザ = 投稿ユーザ
				// 編集ボタンを追加する
				$(selector).append(TAG_EDIT_BUTTON);
				// 編集ボタンへイベントを登録する
				this.setClickEvent($(selector).children(SELECTOR_B_EDIT), this.prepareAnotherWindow, null, $_contentIndex);
				
				// 削除ボタンを追加する
				$(selector).append(TAG_DELETE_BUTTON);
				// 削除ボタンへイベントを登録する
				this.setClickEvent($(selector).children(SELECTOR_B_DELETE), this.clickDeleteButton, null, $(selector).parent().parent(SELECTOR_PARENT_AREA).children(SELECTOR_CONTENT_INDEX), MESSAGE_REPORT_DELETE);
				
				// 管理者権限ならばいいねボタンと未読にするボタンも追加する。
				if(this.getUserAuth() == STR_SUCCESS) {
					// いいねボタンを追加する
					$(selector).append(TAG_FAVORITE_BUTTON);
					// いいねボタンのイベントを登録する
					this.setClickEvent($(selector).children(SELECTOR_B_FAVORITE), this.clickAddContentButton, $(selector).parent().parent(SELECTOR_PARENT_AREA).children(SELECTOR_CONTENT_INDEX), $(selector).parent().parent(SELECTOR_PARENT_AREA).children(SELECTOR_CONTENT_INDEX));
					// ユーザいいねをした状態であればクラス名にフラグ名を追加する
					this.changeButtonStatus($(selector).children(SELECTOR_B_FAVORITE), $(selector).children(SELECTOR_B_FAVORITE).val(), $_contentIndex.children(SELECTOR_FAVARITE_STATUS).text());
					
					// わるいねボタンを追加する
					$(selector).append(TAG_NONE_FAVORITE_BUTTON);
					// わるいねボタンのイベントを登録する
					this.setClickEvent($(selector).children(SELECTOR_B_NONE_FAVORITE), this.clickAddContentButton, $(selector).parent().parent(SELECTOR_PARENT_AREA).children(SELECTOR_CONTENT_INDEX), $(selector).parent().parent(SELECTOR_PARENT_AREA).children(SELECTOR_CONTENT_INDEX));
					// ユーザわるいねをした状態であればクラス名にフラグ名を追加する
					this.changeButtonStatus($(selector).children(SELECTOR_B_NONE_FAVORITE), $(selector).children(SELECTOR_B_NONE_FAVORITE).val(), $_contentIndex.children(SELECTOR_NONE_FAVARITE_STATUS).text());
					
					
					// 未読にするボタンを追加する
					$(selector).append(TAG_NO_READ_BUTTON);
					// 未読にするボタンのイベントを登録する
					this.setClickEvent($(selector).children(SELECTOR_B_NO_READ), this.clickAddContentButton, $(selector).parent().parent(SELECTOR_PARENT_AREA).children(SELECTOR_CONTENT_INDEX), $(selector).parent().parent(SELECTOR_PARENT_AREA).children(SELECTOR_CONTENT_INDEX), MESSAGE_REPORT_NOREAD);

				}
				
				
			} else {
				// ログインユーザ != 投稿ユーザ
				// いいねボタンを追加する
				$(selector).append(TAG_FAVORITE_BUTTON);
				// いいねボタンのイベントを登録する
				this.setClickEvent($(selector).children(SELECTOR_B_FAVORITE), this.clickAddContentButton, $(selector).parent().parent(SELECTOR_PARENT_AREA).children(SELECTOR_CONTENT_INDEX), $(selector).parent().parent(SELECTOR_PARENT_AREA).children(SELECTOR_CONTENT_INDEX));
				// ユーザいいねをした状態であればクラス名にフラグ名を追加する
				this.changeButtonStatus($(selector).children(SELECTOR_B_FAVORITE), $(selector).children(SELECTOR_B_FAVORITE).val(), $_contentIndex.children(SELECTOR_FAVARITE_STATUS).text());

				// わるいねボタンを追加する
				$(selector).append(TAG_NONE_FAVORITE_BUTTON);
				// わるいねボタンのイベントを登録する
				this.setClickEvent($(selector).children(SELECTOR_B_NONE_FAVORITE), this.clickAddContentButton, $(selector).parent().parent(SELECTOR_PARENT_AREA).children(SELECTOR_CONTENT_INDEX), $(selector).parent().parent(SELECTOR_PARENT_AREA).children(SELECTOR_CONTENT_INDEX));
				// ユーザわるいねをした状態であればクラス名にフラグ名を追加する
				this.changeButtonStatus($(selector).children(SELECTOR_B_NONE_FAVORITE), $(selector).children(SELECTOR_B_NONE_FAVORITE).val(), $_contentIndex.children(SELECTOR_NONE_FAVARITE_STATUS).text());

				
				// 未読にするボタンを追加する
				$(selector).append(TAG_NO_READ_BUTTON);
				// 未読にするボタンのイベントを登録する
				this.setClickEvent($(selector).children(SELECTOR_B_NO_READ), this.clickAddContentButton, $(selector).parent().parent(SELECTOR_PARENT_AREA).children(SELECTOR_CONTENT_INDEX), $(selector).parent().parent(SELECTOR_PARENT_AREA).children(SELECTOR_CONTENT_INDEX), MESSAGE_REPORT_NOREAD);
			}
			
			// 各ボタンのイベント登録(アコーディオンの内部には、タグで追加した際にコメントするボタンと、閉じるボタンが入っている)
			
			// TODO:【メモ】閉じるボタンへのセレクタは同じセレクタを使用しているため、概要行生成時にこのボタンに対する設定も行われている。ここでイベント登録するとボタン側だけ二重のイベント登録になる
			// 閉じるボタンのイベントを登録する
			//this.managementAccordion($(selector).parent().children(SELECTOR_B_ACCORDION), $(selector).parent())
			
		}
		
	}
	
	/**
	 * 関数名：	createReportContent
	 * 概要：		日報作成画面に日報を展開する
	 * 引数：		selector		
	 * 戻り値：	なし
	 * 作成日：	2016/11/23
	 * 作成者：	k.urabe
	 */
	this.createReportContent = function(selector) {
		
		var userFlag = STR_FALSE;		// 本人ならtrue、他人の日報ならfalse
		var user;						// ログイン中のユーザIDを保管

		// JSONの長さを取得
		jsonLen = this.json.length;
		
		// jsonが取得出来ているか検証する
		if(this.json !== null && this.json !== undefined && jsonLen !== 0) {
			
			// JSONの行要素を走査する
			for(var key in this.json) {
				
				// ブロックエリアのタグを埋める
				$(selector).append(TAG_BLOCK_AREA);
				// 行(ブロック)内のセレクタを取得する
				var $_blockSelector = $(selector).children(SELECTOR_PARENT_AREA_LAST);
				
				// 追加した行開始タグにクラス名を追加する
				$_blockSelector.addClass(STR_NUMBER + this.json[key][KEY_DETAIL_ID]);
				// 行内の各項目のタグを追加する
				$_blockSelector.append(TAG_REPORT_DATE_OPEN);
				
				// JSONの列要素を走査する
				for(var keyIn in this.json[key]) {
					// 挿入された項目タグの名前と一致させながら値をセットする(textとvalueにそれぞれ)
					$_blockSelector.children(SELECTOR_NAME_START + keyIn + SELECTOR_NAME_END).text(this.json[key][keyIn]);
					$_blockSelector.children(SELECTOR_NAME_START + keyIn + SELECTOR_NAME_END).val(this.json[key][keyIn]);
				}
				
				// 見出し削除ボタンのイベントを登録する
				this.setClickEvent($_blockSelector.children(SELECTOR_B_DEL_INDEX), this.deleteIndex);
				// 固定アイテム関連のボタンイベント登録と表示、非表示を登録する
				this.fixdButtonEvent($_blockSelector);
				
			}

			
			// 各ボタンのイベント登録(アコーディオンの内部には、タグで追加した際にコメントするボタンと、閉じるボタンが入っている)
			
			// TODO:【メモ】閉じるボタンへのセレクタは同じセレクタを使用しているため、概要行生成時にこのボタンに対する設定も行われている。ここでイベント登録するとボタン側だけ二重のイベント登録になる
			// 閉じるボタンのイベントを登録する
			//this.managementAccordion($(selector).parent().children(SELECTOR_B_ACCORDION), $(selector).parent())
			
		}
		
	}
	
	/**
	 * 関数名：	createCommentDetail
	 * 概要：		アコーディオン内のコメント概要と詳細を展開する
	 * 引数：		selector		
	 * 戻り値：	なし
	 * 作成日：	2016/12/04
	 * 作成者：	k.urabe
	 */
	this.createCommentDetail = function(selector, parent_content_id, indent = 0, keyPosition = 0) {
		
		var jsonLen;		// jsonの長さを保持するための変数
		var user;			// ログイン中のユーザIDを保管
		
		// JSONの長さを取得
		jsonLen = this.json.length;
		// ユーザID（ログインユーザ）をセットする
		user = $(SELECTOR_TOP_MENU + MARK_SPACE + SELECTOR_USER_ID).text();
		
		// jsonが取得出来ているか検証する
		if(this.json !== null && this.json !== undefined && jsonLen !== 0) {
			
			// indentで1階層目か判定する
			if(indent == 0) {
				// 1階層目なので見出し行のタグ一式を追加する
				$(selector).append(TAG_COMMENT_INDEX_LINE);
			}
			
			// JSONの行要素を走査する
			for(var key in this.json) {
				
				// この階層に入ったキーの位置以降のみ走査の対象とする、かつ展開済みデータは除外する
				if(keyPosition <= key && !(this.json[key][KEY_OPEN] == KEY_OPEN_FLAG)) {
				
					// JSON内の親コンテンツIDと、引数で受け親コンテンツIDが一致してるか検証する（この階層に展開するデータか検証する）
					if(this.json[key][KEY_DB_PARENT_CONTENT_ID] == parent_content_id) {
							
						// ブロックエリアのタグを追加する
						$(selector).append(TAG_BLOCK_AREA);
						// 行(ブロック)内のセレクタを取得する
						var $_blockSelector = $(selector).children(SELECTOR_PARENT_AREA_LAST);
						// 追加した行開始タグにクラス名を追加する
						$_blockSelector.addClass(STR_LINE + this.json[key][KEY_DB_CONTENT_ID]);
						// indent数分、テーブルのインデントをずらす
						$_blockSelector.css("left", indent * 20 + "px");

						// 行内の各項目のタグを追加する
						$_blockSelector.append(TAG_COMMENT_LINE);
					
						// JSONの列要素を走査する
						for(var keyIn in this.json[key]) {
						
							// 値を挿入するセレクタを取得する
							var $_valueSetPosition = $_blockSelector.children(SELECTOR_DIV_NAME_START + keyIn + SELECTOR_DIV_NAME_END);
							// 挿入された項目タグの名前と一致させながら値をセットする
							$_valueSetPosition.text(this.json[key][keyIn]);
	// 共通処理候補				
							// 既読状態を表す項目の値がセットされたら、適切な文字列に置き換えるために状態判定を行う
							if(keyIn == KEY_READ_STATUS) {
								// 本人投稿 かつ 下書であるか検証
								if(user == this.json[key][KEY_DB_USER_ID] && this.json[key][KEY_DB_ENTRY_STATUS] & FLAG_ENTRY_STATUS_NOTE) {
									// 本人かつ下書なのでステータスの文字列を下書にする
									$_valueSetPosition.text(STR_READ_NOTE);
									// 下書以外の本人投稿であるか
								} else if(user == this.json[key][KEY_DB_USER_ID]) {
									// 本人投稿なのでステータスを文字列を本人にする
									$_valueSetPosition.text(STR_READ_MYSELF);
									// 既読であるか検証する（本人以外）
								} else if(this.json[key][KEY_READ_STATUS] & FLAG_CATEGORY_STATUS_REG) {
									// 本人以外の既読なのでステータスの文字列を既読にする
									$_valueSetPosition.text(STR_READ_ON);
								} else {
									// 本人以外の未読なのでステータスの文字列を未読にする
									$_valueSetPosition.text(STR_READ_OFF);
								}
							}
	// ここまで

						}
						
						// 展開したデータにフラグを追加する
						this.json[key][KEY_OPEN] = KEY_OPEN_FLAG;
						// 行に対して、クリック時にコメント詳細画面を開くイベントを登録する
						this.setClickEvent($_blockSelector.children(SELECTOR_MAIN_TEXT), this.prepareAnotherWindow, null, $_blockSelector);
						
						// ここに見えないボタン配置
						// 出力したレコードの投稿ユーザがログインユーザと異なるか検証し、いいねボタン等を出力する
						if(user != this.json[key][KEY_DB_USER_ID]) {
							// ログインユーザ != 投稿ユーザ
							// いいねボタンを追加する
							$_blockSelector.append(TAG_FAVORITE_BUTTON_COMMENT);
							// いいねボタンのイベントを登録する
							this.setClickEvent($_blockSelector.children(SELECTOR_B_FAVORITE), this.clickAddContentButton, null, $_blockSelector);
							// ユーザいいねをした状態であればクラス名にフラグ名を追加する
							$_blockSelector.children(SELECTOR_FAVARITE_STATUS).text() == FLAG_CATEGORY_STATUS_REG ? $_blockSelector.children(SELECTOR_B_FAVORITE).addClass(KEY_F_ON) : "";

							// わるいねボタンを追加する
							$_blockSelector.append(TAG_NONE_FAVORITE_BUTTON_COMMENT);
							// わるいねボタンのイベントを登録する
							this.setClickEvent($_blockSelector.children(SELECTOR_B_NONE_FAVORITE), this.clickAddContentButton, null, $_blockSelector);
							// ユーザわるいねをした状態であればクラス名にフラグ名を追加する
							$_blockSelector.children(SELECTOR_NONE_FAVARITE_STATUS).text() == FLAG_CATEGORY_STATUS_REG ? $_blockSelector.children(SELECTOR_B_NONE_FAVORITE).addClass(KEY_F_ON) : "";

							
							// 未読にするボタンを追加する
							$_blockSelector.append(TAG_NO_READ_BUTTON_COMMENT);
							// 未読にするボタンのイベントを登録する
							this.setClickEvent($_blockSelector.children(SELECTOR_B_NO_READ), this.clickAddContentButton, null, $_blockSelector);
							// 未読にするが押された状態（未読状態）であればクラス名にフラグを追加する
							$_blockSelector.children(SELECTOR_READ_STATUS).text() == FLAG_CATEGORY_STATUS_REG ? $_blockSelector.children(SELECTOR_B_NO_READ).addClass(KEY_R_ON) : "";
						}
						
					// JSON内の祖先コンテンツIDと、引数で受け親コンテンツIDが一致してる、かつJSONの親コンテンツと、検証中のコンテンツIDが一致するか検証する（次の階層のデータか検証する）
					} else if(this.json[key][KEY_DB_GRAND_PARENT_CONTENT_ID] == parent_content_id) {
						// 階層が1層深まるのでインデントを+1する
						indent += 1;
						// 再帰的に自身を呼び出す
						thisElem.createCommentDetail($(selector).children(STR_DOT + STR_LINE + this.json[key][KEY_DB_PARENT_CONTENT_ID]), this.json[key][KEY_DB_PARENT_CONTENT_ID], indent, key);
						// 階層が戻ってきたのでインデントを-1する
						indent -= 1;
					}
				
				}
				
			}

		// データが取得できていない旨を所定の位置に表示する
		} else {
			// 検索結果が0件の旨のメッセージを表示する
			$(selector).children(SELECTOR_SERACH_MESSAGE).text(MESSAGE_SEARCH_NOT_COMMENT);
		}

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
	
	/**
	 * 関数名：	createUserList
	 * 概要：		ユーザ一覧画面の内容を展開する
	 * 引数：		selector
	 * 戻り値：	なし
	 * 作成日：	2016/12/15
	 * 作成者：	k.urabe
	 */
	this.createUserList = function(selector) {
		
		var jsonLen;		// jsonの長さを保持するための変数
		
		// 取得したデータの長さを取得する
		jsonLen = this.json.length;
		
		// jsonが取得出来ているか検証する
		if(this.json !== null && this.json !== undefined && jsonLen !== 0) {
			
			// 見出し行を追加する
			$(selector).append(TAG_USER_INDEX_LINE);
			
			// json内の行を走査する
			for(var key in this.json) {
				
				// ブロックエリアのタグを追加する
				$(selector).append(TAG_BLOCK_AREA);
				// 行(ブロック)内のセレクタを取得する
				var $_blockSelector = $(selector).children(SELECTOR_PARENT_AREA_LAST);

				// 行内の各項目のタグを追加する
				$_blockSelector.append(TAG_USER_LINE);
				// 追加した行開始タグのvalueにキー名を追加する
				$_blockSelector.val(KEY_USER_LINE);
				
				// json内の列要素を走査する
				for(var keyIn in this.json[key]) {
					// 値を挿入するセレクタを取得する
					var $_valueSetPosition = $_blockSelector.children(SELECTOR_DIV_NAME_START + keyIn + SELECTOR_DIV_NAME_END);
					// 挿入された項目タグの名前と一致させながら値をセットする
					$_valueSetPosition.text(this.json[key][keyIn]);
					
					
					// 性別を表す項目が出たら
					if(keyIn == KEY_USER_SEX) {
						// 取得値に合わせた日本語表記をセットする
						$_valueSetPosition.text(this.sexJudge[this.json[key][keyIn]]);
					}
					
					// 承認状態を表す項目が出たら
					if(keyIn == KEY_USER_SATTUS) {
						// 取得値に合わせた日本語表記をセットする
						$_valueSetPosition.text(this.statusJudge[this.json[key][keyIn]]);
					}
					
					
					
				}
				// 挿入した行に対してイベントを登録する
				this.setClickEvent($_blockSelector, this.prepareAnotherWindow, null, $_blockSelector);
				
			}
			
			
		// データが取得できていない旨を所定の位置に表示する
		} else {
			// 検索結果が0件の旨のメッセージを表示する
			$(SELECTOR_SERACH_MESSAGE).text(MASSAGE_SEARCH_NOT_USER);
		}
		
	}
	
	/**
	 * 関数名：	createUserEdit
	 * 概要：		ユーザ編集画面のベース情報を展開する
	 * 引数：		なし
	 * 戻り値：	なし
	 * 作成日：	2016/12/15
	 * 作成者：	k.urabe
	 */
	this.createUserEdit = function() {
		
		// 関数内でthisが使用できるように退避する
		thisElem = this;
		/* 【TODO】一旦ループで回すのは保留。
		// 増減コンテンツ以外の入力エリアを走査する
		$(SELECTOR_NOMAL_CONTENT).each(function(index, elem){
			// 取得データの列要素を走査する
			for(var keyIn in thisElem.json[0]) {
				// 値を挿入するセレクタを取得する
				var $_valueSetPosition = $(this).children(SELECTOR_DIV_NAME_START + keyIn + SELECTOR_DIV_NAME_END);
				// 挿入された項目タグの名前と一致させながら値をセットする
				$_valueSetPosition.text(thisElem.json[0][keyIn]);
			}
		});
		*/
		
		// user_idを取得する
		$(SELECTOR_USER_ID).val(this.json[0][KEY_USER_ID]);
		// login_passwordを取得する
		//$(SELECTOR_LOGIN_PASSWORD).val(jsonArray[0][KEY_LOGIN_PASSWORD]);
		// user_nameを取得する
		$(SELECTOR_USER_NAME).val(this.json[0][KEY_USER_NAME]);
		// user_name_kanaを取得する
		$(SELECTOR_USER_NAME_KANA).val(this.json[0][KEY_USER_NAME_KANA]);
		// user_birthdayを取得する
		$(SELECTOR_USER_BIRTHDAY).val(this.json[0][KEY_USER_BIRTHDAY]);
		// user_sexを取得する
		$(SELECTOR_USER_SEX).val(this.json[0][KEY_USER_SEX]);
		// campany_idを取得する
		$(SELECTOR_CAMPANY_ID).val(this.json[0][KEY_CAMPANY_ID]);
		// department_idを取得する
		$(SELECTOR_DEPARTMENT_ID).val(this.json[0][KEY_DEPARTMENT_ID]);
		// postion_idを取得する
		$(SELECTOR_POSITION_ID).val(this.json[0][KEY_POSITION_ID]);
		// user_statusを取得する
		$(SELECTOR_USER_STATUS).val(this.json[0][KEY_USER_SATTUS]);
		
	}
	
	/**
	 * 関数名：	createUserEditContent
	 * 概要：		ユーザ編集画面の追加情報（増減項目）を展開する
	 * 引数：		selector
	 * 戻り値：	なし
	 * 作成日：	2016/12/15
	 * 作成者：	k.urabe
	 */
	this.createUserEditContent = function(selector) {
		
		// json内の行要素を走査する
		for(var key in this.json) {
			// selector配下の○○追加ボタンを押下する
			$(selector).children(KEY_BUTTON).click();
			// 値をセットしていくblockAreaを取得する
			$_blockSelector = $(selector).children(SELECTOR_PARENT_AREA_LAST);
			
			// json内の列要素を走査する
			for(var keyIn in this.json[key]) {
				// 値を挿入するセレクタを取得する
				var $_valueSetPosition = $_blockSelector.children(SELECTOR_NAME_START + keyIn + SELECTOR_NAME_END);
				// 挿入された項目タグの名前と一致させながら値をセットする
				$_valueSetPosition.val(this.json[key][keyIn]);
				
				// 扶養を表す項目が出たら
				if(keyIn == KEY_DB_FAMILY_SUPPORT) {
					// 取得値に合わせた日本語表記をセットする
					$_blockSelector.children(SELECTOR_FAMILY_SUPPORT_TITLE).val(this.familySupport[this.json[key][keyIn]]);
				}
				
			}
			
			
		}
		
		
	}
	
}

WindowDesign.prototype = new BaseWindow();
//サブクラスのコンストラクタを有効にする
WindowDesign.prototype.constructor = BaseWindow;