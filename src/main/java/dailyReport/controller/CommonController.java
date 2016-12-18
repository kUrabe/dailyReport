/**
 * ファイル名：	CommonController.java
 * 作成日：	2016/11/24
 * 作成者：	k.urabe
 * パッケージ：	dailyReport/controller
 */

package dailyReport.controller;

import java.security.Principal;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import dailyReport.Constants;
import dailyReport.resource.UserInf;
import dailyReport.service.CommonService;


/**
 * クラス名：	CommonController
 * 概要：		画面特有以外のリクエストに対するコントローラ機能を取りまとめたクラス
 * 作成日：	2016/11/24
 * 作成者：	k.urabe
 */
@RestController
public class CommonController {

	// ビジネスロジックであるCommonServiceクラスをインジェクションする
	@Autowired
	CommonService commonService;
	
	
	/**
	 * 関数名：	requestUserAuth
	 * 概要：		クライアントから送られてくるユーザが管理権限が付いているか検証する
	 * 引数：		パラメータ String crud	処理の種別
	 * 			パラメータ String json	JSON文字列
	 * 戻り値：	String
	 * 作成日：	2016/12/12
	 * 作成者：	k.urabe
	 */
	@RequestMapping(value = "common/userAuth", method = RequestMethod.POST)
	public String requestUserAuth(Principal principal) {
		
		int getAuth = 0;					// DB上から取得したログインユーザに紐付く権限を取得する
		String result = "";					// 処理結果の判定を格納するための変数
		
		// ログイン中のユーザ情報を取得する
		UserInf user = commonService.userAuth(principal.getName());
		// ログインユーザに紐付くユーザの権限を得る
		getAuth = user.getUserAuthority();
		// 取得したユーザの権限が管理者か検証する
		if((getAuth & Constants.FLAG_USER_AUTH_MASTER) != 0) {
			// 返却用Stringに成功判定文字を入れる
			result = Constants.STR_SUCCESS;
		}
		
		// 
		return result;
		
	}
	
	/**
	 * 関数名：	requestSaveAddContent
	 * 概要：		追加コンテンツ（いいね、未読にする）へのリクエストをマッピングする。
	 * 引数：		パラメータ String crud	処理の種別
	 * 			パラメータ String json	JSON文字列
	 * 戻り値：	String
	 * 作成日：	2016/11/24
	 * 作成者：	k.urabe
	 */
	@RequestMapping(value = "common/saveAddContent", method = RequestMethod.POST)
	public String requestSaveAddContent(@RequestParam("crud") String crud, @RequestParam("json") String json) {
		
		boolean result = false;					// 処理結果の判定を格納するための変数
		String message;							// 返却用JSONにセットする文字列格納
		
		// TODO:【未実装】jacksonが使えていない。Springでは違うもの使う？　それともインポートする？
		// パラメータのJSONをMapに変換する
		Map<String, Object> map = commonService.convertJsonToMap(json);
		
		// パラメータのcurdから処理内容が新規登録か判定する。
		if(crud.equals(Constants.STR_CREATE)) {
			// 新規登録の処理を実行する
			result = commonService.createAddContent(map);
		// 新規登録でなければ更新処理
		} else {
			// 更新の処理を実行する
			result = commonService.updateAddContent(map);
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
	 * 関数名：	requestUserIdCheck
	 * 概要：		クライアントから送られてくるユーザIDが存在するかチェックする
	 * 引数：		パラメータ String crud	処理の種別
	 * 			パラメータ String json	JSON文字列
	 * 戻り値：	String
	 * 作成日：	2016/12/16
	 * 作成者：	k.urabe
	 */
	@RequestMapping(value = "common/userId", method = RequestMethod.POST)
	public String requestUserIdCheck(@RequestParam("user") String userId) {
		
		int getAuth = 0;					// DB上から取得したログインユーザに紐付く権限を取得する
		String result = "";					// 処理結果の判定を格納するための変数
		
		// パラメータのJSONをMapに変換する
		//Map<String, Object> map = commonService.convertJsonToMap(json);
		
		// ログイン中のユーザ情報を取得する
		UserInf user = commonService.getUserName(userId);
		
		// ユーザが存在していないことを確認する
		if(user == null) {
			// 返却用Stringに成功判定文字を入れる
			result = Constants.STR_SUCCESS;
		}
		
		// 判定結果を返却する
		return result;
		
	}
	
}
