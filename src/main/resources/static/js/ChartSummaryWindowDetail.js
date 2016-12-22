/**
 * ファイル名：	ChartSummaryWindowDetail.js
 * 概要：		グラフ集計画面系の処理を集めたクラスを定義したファイル。
 * 作成日：	2016/12/21
 * 作成者：	k.urabe
 * path：		js/ChartSummaryWindowDetail.js
 */

/**
 * クラス名：	ChartSummaryWindowDetail
 * 概要：		グラフ集計画面系の処理を集めたクラス。WindowDesignクラスを継承する。
 * 作成日：	2016/12/21
 * 作成者：	k.urabe
 */
function ChartSummaryWindowDetail() {
	
	WindowDesign.call(this);	//スーパークラスのコンストラクタを呼ぶ
	
	/**
	 * 関数名：	createUserListWindow
	 * 概要：		画面の初期表示機能
	 * 引数：		なし
	 * 戻り値：	なし
	 * 作成日：	2016/12/21
	 * 作成者：	k.urabe
	 */
	this.createChartSummaryWindow = function() {
		
		// グラフ表示ボタンにイベントを登録する
		this.setClickEvent(SELECTOR_B_CHART_VIEW, this.clickChartViewButton);
		// 戻るボタンにイベントを登録する
		this.setClickEvent(SELECTOR_B_CANCEL, this.closeWindow);
		// グラフ表示ボタンを押下する
		$(SELECTOR_B_CHART_VIEW).click();
		
		// 画面を表示する
		$(KEY_BODY).css(KEY_VISIBILITY, KEY_VISIBLE);
		
	}
	
	/**
	 * 関数名：	clickChartViewButton
	 * 概要：		グラフ表示ボタンを押下した際の処理
	 * 引数：		なし
	 * 戻り値：	なし
	 * 作成日：	2016/12/21
	 * 作成者：	k.urabe
	 */
	this.clickChartViewButton = function(selector, thisElem) {
		
		var jsonArray = {};			// リクエストに使用するjson連想配列を作成する
		var message = "";			// 検索項目のチェックエラー文字列を格納する変数
		
		// 検索項目に入力された値をチェックする
		message = thisElem.checkSearchValue();
		// 入力値のエラーが発生しているか検証
		if(message == "") {
			// 入力項目にエラーがないため、描画処理を行っていく。
			
			// 検索項目内のinput要素を走査する
			$(SELECTOR_SEARCH_AREA).children(KEY_INPUT).each(function(index, elem){
				// inputの形式がチェックボックスか判定する
				if($(elem).prop(KEY_CHECKED)) {
					// チェックボックスだと判定
					// 初めて当該キーに値をセットするか検証
					if(jsonArray[$(elem).attr(KEY_CLASS)] == undefined) {
						// 初期として0をセットする
						jsonArray[$(elem).attr(KEY_CLASS)] = 0;
					}
					// 入力値を加算する
					jsonArray[$(elem).attr(KEY_CLASS)] += parseInt($(elem).val(), 10);
				// チェックボックス以外か判定する
				} else if($(elem).attr(KEY_TYPE) != KEY_CHECKBOX) {
					// チェックボックス出ないと判定
					// 入力値をセットしていく。
					jsonArray[$(elem).attr(KEY_CLASS)] = $(elem).val();
				}
			});
			// DBからグラフ用のデータを取得する
			thisElem.getJsonData(PATH_CREATE_CHART_VIEW, jsonArray, STR_READ);
			// グラフ見出しのメッセージを削除する
			$(SELECTOR_SERACH_MESSAGE).text("");
			// 既存のグラフを削除する
			// TODO【未実装】そもそも、削除が必要なのか、グラフ描画の方法による（指定エリアに追加なのか、削除してから再作成なのか）
			$(KEY_IFRAME).remove();
			$(SELECTOR_VIEW_AREA).remove();
			// 描画エリアを再度追加する
			$(SELECTOR_CONTENT_AREA).append(TAG_BAR_CHART);
			
			// 取得したデータをグラフ用の値形式に加工する
			thisElem.createChartData();
			
			// 描画対象の評価としていいねが選択されている
			if(jsonArray[KEY_ADD_CATEGORY] & FLAG_ADD_CATEGORY_FAVORITE) {
				// いいねのデータセットをグラフのデータに追加する
				thisElem.data[STR_DATASETS].push(thisElem.favoriteDataset);
			}
			// 描画対象の評価としてわるいねが選択されている
			if(jsonArray[KEY_ADD_CATEGORY] & FLAG_ADD_CATEGORY_NONE_FAVORITE) {
				// いいねのデータセットをグラフのデータに追加する
				thisElem.data[STR_DATASETS].push(thisElem.noneFavoriteDataset);
			}
			
			// グラフの描画エリアを取得する
			var canvas = document.getElementById(KEY_VIEW_AREA);
			// 値をセットしたグラフを表示する
			var chart = new Chart(canvas, {
				//グラフの種類
				type: thisElem.type,
				//表示するデータ
				data: thisElem.data,
				//オプション設定
				options: thisElem.options
			});
			
		} else {
			// 入力項目でエラーが発生しているため、その旨を警告する
			thisElem.openWarnigDialog(message);
		}
		
		
	}
	
	/**
	 * 関数名：	checkSearchValue
	 * 概要：		グラフ表示ボタンを押下した際の処理
	 * 引数：		なし
	 * 戻り値：	なし
	 * 作成日：	2016/12/21
	 * 作成者：	k.urabe
	 */
	this.checkSearchValue = function() {
		
		var message = "";			// 返却用メッセージ
		var entry_format = 0;
		var add_category = 0;
		
		// 検索項目内のinput要素を走査する
		$(SELECTOR_SEARCH_AREA).children(KEY_INPUT).each(function(index, elem){
			
			// クラス名を取得する
			var target = $(elem).get(0).className.split(" ")[0];
			// 入力値を取得する
			var value = $(elem).val();
			
			// 入力があり、かつFROMかTOであるか
			if(value !== "" && (target == KEY_SERACH_FROM_DATE || target == KEY_SERACH_TO_DATE)) {
				// 入力値が正規表現とマッチするか検証
				if(!(thisElem.pattenCheck[target].test(value))) {
					// メッセージが追加済みか検証する
					if(message.indexOf(thisElem.pattenMessage[target]) == -1) {
						// メッセージにエラーメッセージを追加する。
						message += thisElem.pattenMessage[target];
					}
				}
			// entry_formatか検証
			} else if(target == KEY_ENTRY_FORMAT) {
				// inputの形式がチェックボックスか判定する
				if($(elem).prop(KEY_CHECKED)) {
					// チェックボックスだと判定
					// 入力値を加算する
					entry_format += parseInt($(elem).val(), 10);
				}
			// add_categoryか検証
			} else if(target == KEY_ADD_CATEGORY) {
				// inputの形式がチェックボックスか判定する
				if($(elem).prop(KEY_CHECKED)) {
					// チェックボックスだと判定
					// 入力値を加算する
					add_category += parseInt($(elem).val(), 10);
				}
			}
		});
		
		// entry_formatの値が0（何もチェックが付いていない）か検証する
		if(entry_format == 0) {
			// エラーメッセージを追加する
			message += MASSAGE_ENTRY_FORMAT;
		}
		// add_categoryの値が0（何もチェックが付いていない）か検証する
		if(add_category == 0) {
			// エラーメッセージを追加する
			message += MASSAGE_ADD_CATEGORY;
		}
		
		// massageを返す
		return message;
	}
	
	/**
	 * 関数名：	createChartData
	 * 概要：		DBから取得したデータを基にグラフ用の設定値に加工する
	 * 引数：		なし
	 * 戻り値：	なし
	 * 作成日：	2016/12/21
	 * 作成者：	k.urabe
	 */
	this.createChartData = function() {
		
		// データ登録前に、各データ用の配列を初期化する
		// 全体の横軸ラベルを登録する配列を初期化する
		this.data[STR_LABELS] = [];
		// いいね、わるいねのデータセットを登録する配列を初期化する
		this.data[STR_DATASETS] = [];
		// いいね用のデータセット一式を登録する配列を初期化する
		this.favoriteDataset[STR_DATA] = [];
		// わるいね用のデータセット一式を登録する配列を初期化する
		this.noneFavoriteDataset[STR_DATA] = [];
		
		// 取得したjsonデータの行要素を走査する
		for(var key in this.json) {
			// 横軸用のユーザ名の配列を形成していく
			this.data[STR_LABELS].push(this.json[key][KEY_USER_NAME]);
			// いいねのカウント数の配列を形成していく
			this.favoriteDataset[STR_DATA].push(this.json[key][KEY_FAVORITE_COUNT]);
			// わるいねのカウント数の配列を形成していく
			this.noneFavoriteDataset[STR_DATA].push(this.json[key][KEY_NONE_FAVORITE_COUNT]);
		}
		
	}

	// バーチャート用のグラフタイプ
	this.type = STR_CHART_BAR;
	// バーチャート用のデータ群
	this.data = {
		labels:[],
		datasets:[],
	}
	// バーチャート用のオプション設定
	this.options = {
		title: {    
		    display: true,
		    text: STR_BAR_CHART_TITLE
		},
		//軸の設定
	    scales: {
			//縦軸の設定
			yAxes: [{
				//目盛りの設定
				ticks: {
					//開始値を0にする
					beginAtZero:true,
				}
			}]
		},
		//ホバーの設定
		hover: {
			//ホバー時の動作（single, label, dataset）
			mode: STR_HOVER_MODE
		}
	}
	// いいね用データセット群
	this.favoriteDataset = {
		label: STR_FAVORITE_LABEL,
		backgroundColor: STR_FAVORITE_BACKGROUND_COLOR,
		borderColor: STR_FAVORITE_BORDER_COLOR,
		borderWidth: 1,
		hoverBackgroundColor: STR_FAVORITE_H_BACKGROUND_COLOR,
		hoverBorderColor: STR_FAVORITE_H_BORDER_COLOR,
		data: []
	}
	// わるいね用データセット群
	this.noneFavoriteDataset = {
		label: STR_NONE_FAVORITE_LABEL,
		backgroundColor: STR_NONE_FAVORITE_BACKGROUND_COLOR,
		borderColor: STR_NONE_FAVORITE_BORDER_COLOR,
		borderWidth: 1,
		hoverBackgroundColor: STR_NONE_FAVORITE_H_BACKGROUND_COLOR,
		hoverBorderColor: STR_NONE_FAVORITE_H_BORDER_COLOR,
		data: []
	}
	
}

ChartSummaryWindowDetail.prototype = new WindowDesign();
//サブクラスのコンストラクタを有効にする
ChartSummaryWindowDetail.prototype.constructor = WindowDesign;