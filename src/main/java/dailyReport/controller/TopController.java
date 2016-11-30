/**
 * ファイル名：	TopController.java
 * 作成日：	2016/11/24
 * 作成者：	k.urabe
 * パッケージ：	dailyReport/controller
 */

package dailyReport.controller;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import dailyReport.Constants;
import dailyReport.resource.RecordContentDetail;
import dailyReport.resource.RecordContentInf;
import dailyReport.service.CommonService;
import dailyReport.service.TopSearchContentSummary;
import dailyReport.service.TopService;

/**
 * クラス名：	TopController
 * 概要：		Top画面系のリクエストに対するコントローラ機能を取りまとめたクラス
 * 作成日：	2016/11/24
 * 作成者：	k.urabe
 */
@RestController
public class TopController {

	// ビジネスロジックであるCommonServiceクラスをインジェクションする
	@Autowired
	CommonService commonService;
	@Autowired
	TopService topService;
	
	/**
	 * 関数名：	requestTopPageContent
	 * 概要：		top画面のアコーディオン内を除くコンテンツの取得（概要など）
	 * 引数：		パラメータ String crud	処理の種別
	 * 			パラメータ String json	JSON文字列
	 * 戻り値：	String
	 * 作成日：	2016/11/24
	 * 作成者：	k.urabe
	 */
	@RequestMapping(value = "top/topPageContent", method = RequestMethod.POST)
	public List<TopSearchContentSummary> requestTopPageContent(@RequestParam("crud") String crud, @RequestParam("json") String json) {
		
		String message = "";							// 返却用JSONにセットする文字列格納
		
		// TODO:【未実装】jacksonが使えていない。Springでは違うもの使う？　それともインポートする？
		// パラメータのJSONをMapに変換する
		Map<String, Object> map = commonService.convertJsonToMap(json);
		
		// JSON内の各値に対してエスケープ処理を行う
		commonService.checkValue(map);
		
		// TODO:【未実装】ここで格納する型が単純なテーブルのentityクラスではダメなはずなので要検証
		// 検索を実行し、その結果をentityインスタンスへ格納する
		List<TopSearchContentSummary> topSearchContentSummary = null;
		try {
			topSearchContentSummary = topService.searchTopPageContent(map);
		} catch (ParseException e) {
			// TODO 自動生成された catch ブロック
			e.printStackTrace();
		}
		
		// TODO:【未実装】entityクラスに対する0件の検証が以下であっているか不明
		// 検索結果が1件以上取得出来ているか検証する
		if(topSearchContentSummary == null) {
			// 返却用メッセージとして取得できなかった旨の文言をセットしたJSON文字列を作成する
			message = commonService.setResultMessage(Constants.STR_NO_GET);
		} else {
			// TODO:【未実装】entityクラスをJSON文字列にする方法が実装出来ていない。
			// entityインスタンスをJSON文字列かしてセットする
			// message = XXXXX;
		}
		
		// 作成したJSON文字列を返却する
		return topSearchContentSummary;
		
	}
	
	/**
	 * 関数名：	requestTopPageDetailContent
	 * 概要：		top画面のアコーディオン内を除くコンテンツの取得（概要など）
	 * 引数：		パラメータ String crud	処理の種別
	 * 			パラメータ String json	JSON文字列
	 * 戻り値：	String
	 * 作成日：	2016/11/24
	 * 作成者：	k.urabe
	 */
	@RequestMapping(value = "top/topPageDetailContent", method = RequestMethod.POST)
	public List<RecordContentDetail> requestTopPageDetailContent(@RequestParam("crud") String crud, @RequestParam("json") String json) {
		
		String message = "";							// 返却用JSONにセットする文字列格納
		
		// TODO:【未実装】jacksonが使えていない。Springでは違うもの使う？　それともインポートする？
		// パラメータのJSONをMapに変換する
		Map<String, Object> map = commonService.convertJsonToMap(json);
		
		// TODO:【未実装】ここで格納する型が単純なテーブルのentityクラスではダメなはずなので要検証（こちらは詳細テーブルだけでもよいかも…）
		// 検索を実行し、その結果をentityインスタンスへ格納する
		List<RecordContentDetail>recordContentDetail = topService.searchTopPageDetailContent(map);
		
		// TODO:【未実装】entityクラスに対する0件の検証が以下であっているか不明
		// 検索結果が1件以上取得出来ているか検証する
		if(recordContentDetail == null) {
			// 返却用メッセージとして取得できなかった旨の文言をセットしたJSON文字列を作成する
			message = commonService.setResultMessage(Constants.STR_NO_COMMENT);
		} else {
			// TODO:【未実装】entityクラスをJSON文字列にする方法が実装出来ていない。
			// entityインスタンスをJSON文字列かしてセットする
			// message = XXXXX;
		}
		
		// 作成したJSON文字列を返却する
		return recordContentDetail;
		
	}
	
	/**
	 * 関数名：	requestAnotherWindow
	 * 概要：		別ウインドウ用のHTMLを返す
	 * 引数：		パラメータ String crud	処理の種別
	 * 			パラメータ String json	JSON文字列
	 * 戻り値：	String
	 * 作成日：	2016/11/24
	 * 作成者：	k.urabe
	 */
	// TODO:【未実装】現在は、文字列で返しているが、クライアントから直接ページURLにリクエストし、それをマッピングしてデータ取得させる方法を検討中
	@RequestMapping(value = "createWindow/{htmlPath}", params = "anotherWidow", method = RequestMethod.POST)
	public String requestAnotherWindow(@PathVariable("htmlPath") String htmlPath) {
		// リクエストのpathで受けたHTMLを返す。
		return htmlPath;
	}
	
	/**
	 * 関数名：	requestDeleteContent
	 * 概要：		削除ボタン押下時のリクエストをマッピング
	 * 引数：		パラメータ String crud	処理の種別
	 * 			パラメータ String json	JSON文字列
	 * 戻り値：	String
	 * 作成日：	2016/11/24
	 * 作成者：	k.urabe
	 */
	@RequestMapping(value = "common/deleteContent", method = RequestMethod.POST)
	public String requestSaveAddContent(@RequestParam("crud") String crud, @RequestParam("json") String json) {
		
		boolean result = false;					// 処理結果の判定を格納するための変数
		String message;							// 返却用JSONにセットする文字列格納
		
		// TODO:【未実装】jacksonが使えていない。Springでは違うもの使う？　それともインポートする？
		// パラメータのJSONをMapに変換する
		Map<String, Object> map = commonService.convertJsonToMap(json);
		
		// パラメータのcurdから処理内容が論理削除（update）であるか検証する
		if(crud == Constants.STR_UPDATE) {
			// 論理削除の処理を実行する
			result = topService.logcalDeleteContent(map);
		// 論理削除でなければ物理削除
		} else {
			// 物理削除の処理を実行する
			result = topService.physicalDeleteContent(map);
		}
		
		// 処理の成否を判定する
		if(result) {
			// 成功している旨のメッセージをセットする
			message = Constants.STR_SUCCESS;
		} else {
			// 失敗している旨のメッセージをセットする
			message = Constants.STR_FAILURE;
		}
		
		// JSON文字列で返却用メッセージを作成し、返す。
		return commonService.setResultMessage(message);

	}
	
}
