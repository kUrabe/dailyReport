/**
 * ファイル名：	CreateController.java
 * 作成日：	2016/11/24
 * 作成者：	k.urabe
 * パッケージ：	dailyReport/controller
 */

package dailyReport.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import dailyReport.Constants;
import dailyReport.resource.RecordContentDetail;
import dailyReport.service.CommonService;
import dailyReport.service.CreateService;
import dailyReport.resource.GetReportByDayQuery;


/**
 * クラス名：	CreateController
 * 概要：		作成画面系のリクエストに対するコントローラ機能を取りまとめたクラス
 * 作成日：	2016/11/24
 * 作成者：	k.urabe
 */
@RestController
public class CreateController {
	
	// ビジネスロジックであるCommonServiceクラスをインジェクションする
	@Autowired
	CommonService commonService;
	@Autowired
	CreateService createService;
	//@Autowired
	//RecordContentDetail recordContentDetail;
	
	
	/**
	 * 関数名：	requestContentByDay
	 * 概要：		日報作成画面の日付に合わせた内容の取得
	 * 引数：		パラメータ String crud	処理の種別
	 * 			パラメータ String json	JSON文字列
	 * 戻り値：	String
	 * 作成日：	2016/11/24
	 * 作成者：	k.urabe
	 */
	@RequestMapping(value = "create/contentByDay", method = RequestMethod.POST)
	public List<GetReportByDayQuery> requestContentByDay(@RequestParam("crud") String crud, @RequestParam("json") String json) {
		
		String message = "";							// 返却用JSONにセットする文字列格納
		
		// TODO:【未実装】jacksonが使えていない。Springでは違うもの使う？　それともインポートする？
		// パラメータのJSONをMapに変換する
		Map<String, Object> map = commonService.convertJsonToMap(json);
		
		// TODO:【未実装】ここで格納する型が単純なテーブルのentityクラスではダメなはずなので要検証（こちらは詳細テーブルだけでもよいかも…）
		// 検索を実行し、その結果をentityインスタンスへ格納する
		List<GetReportByDayQuery> getReportByDayQuery = createService.getContentByDay(map);
		
		// 作成したJSON文字列を返却する
		return getReportByDayQuery;
		
	}
	
	/**
	 * 関数名：	requestSaveContent
	 * 概要：		コンテンツ（日報、コメント）の新規・更新リクエストをマッピング
	 * 引数：		パラメータ String crud	処理の種別
	 * 			パラメータ String json	JSON文字列
	 * 戻り値：	String
	 * 作成日：	2016/11/24
	 * 作成者：	k.urabe
	 */
	// TODO:【未実装】コンテンツに紐付く詳細テーブルの数が増減する可能性があるため単純なアップデートは困難。一度関連詳細テーブルのレコードを削除して、新規登録してはどうか。
	@RequestMapping(value = "create/saveContent", method = RequestMethod.POST)
	public String requestSaveContent(@RequestParam("crud") String crud, @RequestParam("json") String json) {
	
		boolean result = false;					// 処理結果の判定を格納するための変数
		String message;							// 返却用JSONにセットする文字列格納
		
		// TODO:【未実装】jacksonが使えていない。Springでは違うもの使う？　それともインポートする？
		// パラメータのJSONをMapに変換する
		Map<String, Object> map = commonService.convertJsonToMap(json);
		
		// パラメータのcurdから処理内容が新規登録であるか検証する
		if(crud.equals(Constants.STR_CREATE)) {
			// 新規登録の処理を実行する
			result = createService.createContent(map);
		// 新規登録でなければ更新処理
		} else {
			// 更新の処理を実行する
			result = createService.updateContent(map);
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
	
	/**
	 * 関数名：	requestBeforeContent
	 * 概要：		前日以前の日報（予定）の値を取得する
	 * 引数：		パラメータ String crud	処理の種別
	 * 			パラメータ String json	JSON文字列
	 * 戻り値：	String
	 * 作成日：	2016/11/24
	 * 作成者：	k.urabe
	 */
	@RequestMapping(value = "create/beforeContent", method = RequestMethod.POST)
	public String requestBeforeContent(@RequestParam("crud") String crud, @RequestParam("json") String json) {
	
		String message = "";							// 返却用JSONにセットする文字列格納
		
		// TODO:【未実装】jacksonが使えていない。Springでは違うもの使う？　それともインポートする？
		// パラメータのJSONをMapに変換する
		Map<String, Object> map = commonService.convertJsonToMap(json);
	
		// TODO:【未実装】ここで格納する型が単純なテーブルのentityクラスではダメなはずなので要検証（こちらは詳細テーブルだけでもよいかも…）
		// 検索を実行し、その結果をentityインスタンスへ格納する
		List<RecordContentDetail> recordContentDetail = null;//createService.getContentByDay(map);
		
		// TODO:【未実装】entityクラスに対する0件の検証が以下であっているか不明
		// 検索結果が1件以上取得出来ているか検証する
		if(recordContentDetail == null) {
			// 返却用メッセージとして取得できなかった旨(失敗した)の文言をセットしたJSON文字列を作成する
			message = commonService.setResultMessage(Constants.STR_NO_BEFORE_PLAN);
		} else {
			// TODO:【未実装】entityクラスをJSON文字列にする方法が実装出来ていない。
			// entityインスタンスをJSON文字列かしてセットする
			// message = XXXXX;
		}
		
		// 作成したJSON文字列を返却する
		return message;
	
	}
	
	/**
	 * 関数名：	requestSaveTemplate
	 * 概要：		テンプレートの新規・更新リクエストをマッピング
	 * 引数：		パラメータ String crud	処理の種別
	 * 			パラメータ String json	JSON文字列
	 * 戻り値：	String
	 * 作成日：	2016/11/24
	 * 作成者：	k.urabe
	 */
	// TODO:【未実装】コンテンツに紐付く詳細テーブルの数が増減する可能性があるため単純なアップデートは困難。一度関連詳細テーブルのレコードを削除して、新規登録してはどうか。
	@RequestMapping(value = "create/saveTemplate", method = RequestMethod.POST)
	public String requestSaveTemplate(@RequestParam("crud") String crud, @RequestParam("json") String json) {
	
		boolean result = false;					// 処理結果の判定を格納するための変数
		String message;							// 返却用JSONにセットする文字列格納
		
		// TODO:【未実装】jacksonが使えていない。Springでは違うもの使う？　それともインポートする？
		// パラメータのJSONをMapに変換する
		Map<String, Object> map = commonService.convertJsonToMap(json);
		
		// パラメータのcurdから処理内容が新規登録であるか検証する
		if(crud.equals(Constants.STR_CREATE)) {
			// 新規登録の処理を実行する
			result = createService.createContent(map);
		// 新規登録でなければ更新処理
		} else {
			// 更新の処理を実行する
			result = createService.updateContent(map);
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
