package dailyReport.controller;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import dailyReport.resource.GetUserBaseInfQuery;
import dailyReport.service.CommonService;
import dailyReport.service.UserService;

/**
 * クラス名：	UserController
 * 概要：		ユーザ編集・一覧系のリクエストに対するコントローラ機能を取りまとめたクラス
 * 作成日：	2016/12/16
 * 作成者：	k.urabe
 */
@RestController
public class UserController {

	// ビジネスロジックであるCommonServiceクラスをインジェクションする
	@Autowired
	CommonService commonService;
	@Autowired
	UserService userService;
	
	
	/**
	 * 関数名：	requestBaseUserInf
	 * 概要：		ユーザ編集画面のユーザBase情報の取得
	 * 引数：		パラメータ String crud	処理の種別
	 * 			パラメータ String json	JSON文字列
	 * 戻り値：	String
	 * 作成日：	2016/11/24
	 * 作成者：	k.urabe
	 */
	@RequestMapping(value = "user/getBaseInf", method = RequestMethod.POST)
	public List<GetUserBaseInfQuery> requestBaseUserInf(@RequestParam("crud") String crud, @RequestParam("json") String json) {
		
		// パラメータのJSONをMapに変換する
		Map<String, Object> map = commonService.convertJsonToMap(json);
		
		// 検索を実行し、その結果をentityインスタンスへ格納する
		List<GetUserBaseInfQuery> getUserBaseInfQuery = userService.searchBaseInf(map);
		
		// 作成したJSON文字列を返却する
		return getUserBaseInfQuery;
		
	}
	
	/**
	 * 関数名：	requestAddUserInf
	 * 概要：		ユーザ編集画面のユーザ追加情報の取得
	 * 引数：		パラメータ String crud	処理の種別
	 * 			パラメータ String json	JSON文字列
	 * 戻り値：	String
	 * 作成日：	2016/11/24
	 * 作成者：	k.urabe
	 */
	@RequestMapping(value = "user/getAddInf", method = RequestMethod.POST)
	public String requestAddUserInf(@RequestParam("crud") String crud, @RequestParam("json") String json) {
		
		// パラメータのJSONをMapに変換する
		Map<String, Object> map = commonService.convertJsonToMap(json);
		
		// 検索を実行し、その結果をentityインスタンスへ格納する
		String getUserAddInf = userService.searchAddInf(map);
		
		// 作成したJSON文字列を返却する
		return getUserAddInf;
		
	}
	
	/**
	 * 関数名：	requestSaveBaseUserInf
	 * 概要：		ユーザ編集画面のベース情報の新規登録
	 * 引数：		パラメータ String crud	処理の種別
	 * 			パラメータ String json	JSON文字列
	 * 戻り値：	String
	 * 作成日：	2016/11/24
	 * 作成者：	k.urabe
	 * @throws ParseException 
	 */
	@RequestMapping(value = "user/saveBaseInf", method = RequestMethod.POST)
	public String requestSaveBaseUserInf(@RequestParam("crud") String crud, @RequestParam("json") String json) throws ParseException {
		
		// パラメータのJSONをMapに変換する
		Map<String, Object> map = commonService.convertJsonToMap(json);
		
		// 登録を実行し、その結果文字列を得る
		String getUserAddInf = userService.saveBaseInf(map);
		
		// 結果を返却する
		return commonService.setResultMessage(getUserAddInf);
		
	}
	
	/**
	 * 関数名：	requestUpdateBaseUserInf
	 * 概要：		ユーザ編集画面のベース情報の更新
	 * 引数：		パラメータ String crud	処理の種別
	 * 			パラメータ String json	JSON文字列
	 * 戻り値：	String
	 * 作成日：	2016/11/24
	 * 作成者：	k.urabe
	 */
	@RequestMapping(value = "user/updateBaseInf", method = RequestMethod.POST)
	public String requestUpdateBaseUserInf(@RequestParam("crud") String crud, @RequestParam("json") String json) throws ParseException {
		
		// 登録を実行し、その結果文字列を得る
		Map<String, Object> map = commonService.convertJsonToMap(json);
		
		// 検索を実行し、その結果をentityインスタンスへ格納する
		String getUserAddInf = userService.updateBaseInf(map);
		
		// 結果を返却する
		return commonService.setResultMessage(getUserAddInf);
		
	}
	
	/**
	 * 関数名：	requestSaveAddUserInf
	 * 概要：		ユーザ編集画面の増減コンテンツ登録、更新
	 * 引数：		パラメータ String crud	処理の種別
	 * 			パラメータ String json	JSON文字列
	 * 戻り値：	String
	 * 作成日：	2016/11/24
	 * 作成者：	k.urabe
	 */
	@RequestMapping(value = "user/saveAddInf", method = RequestMethod.POST)
	public String requestSaveAddUserInf(@RequestParam("crud") String crud, @RequestParam("json") String json) {
		
		// パラメータのJSONをMapに変換する
		Map<String, Object> map = commonService.convertJsonToMap(json);
		
		// 登録を実行し、その結果文字列を得る
		String getUserAddInf = userService.saveAddInf(map);
		
		// 結果を返却する
		return commonService.setResultMessage(getUserAddInf);
		
	}
	
	/**
	 * 関数名：	requestDeleteUserInf
	 * 概要：		ユーザ編集画面のユーザ情報削除
	 * 引数：		パラメータ String crud	処理の種別
	 * 			パラメータ String json	JSON文字列
	 * 戻り値：	String
	 * 作成日：	2016/11/24
	 * 作成者：	k.urabe
	 */
	@RequestMapping(value = "user/deleteUserInf", method = RequestMethod.POST)
	public String requestDeleteUserInf(@RequestParam("crud") String crud, @RequestParam("json") String json) {
		
		// パラメータのJSONをMapに変換する
		Map<String, Object> map = commonService.convertJsonToMap(json);
		
		// 登録を実行し、その結果文字列を得る
		String getUserAddInf = userService.deleteBaseInf(map);
		
		// 結果を返却する
		return commonService.setResultMessage(getUserAddInf);
		
	}
	
	/**
	 * 関数名：	requestMatchUserInf
	 * 概要：		ユーザ一覧画面の検索結果を得る
	 * 引数：		パラメータ String crud	処理の種別
	 * 			パラメータ String json	JSON文字列
	 * 戻り値：	String
	 * 作成日：	2016/11/24
	 * 作成者：	k.urabe
	 */
	@RequestMapping(value = "user/matchUserInf", method = RequestMethod.POST)
	public List<GetUserBaseInfQuery> requestMatchUserInf(@RequestParam("crud") String crud, @RequestParam("json") String json) {
		
		// パラメータのJSONをMapに変換する
		Map<String, Object> map = commonService.convertJsonToMap(json);
		
		// 登録を実行し、その結果文字列を得る
		List<GetUserBaseInfQuery> getUserAddInf = userService.macthBaseInf(map);
		
		// 結果を返却する
		return getUserAddInf;
		
	}
	
	
}
