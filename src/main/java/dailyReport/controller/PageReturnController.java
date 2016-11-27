/**
 * ファイル名：	PageReturnController.java
 * 作成日：	2016/11/24
 * 作成者：	k.urabe
 * パッケージ：	dailyReport/controller
 */

package dailyReport.controller;

import java.util.Calendar;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * クラス名：	PageReturnController
 * 概要：		ページを返すタイプのリクエストを処理するパラメータ
 * 作成日：	2016/11/24
 * 作成者：	k.urabe
 */
@Controller
public class PageReturnController {

	/**
	 * 関数名：	requestTopPage
	 * 概要：		topページへのリクエスト
	 * 引数：		なし
	 * 戻り値：	String
	 * 作成日：	2016/11/24
	 * 作成者：	k.urabe
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String requestTopPage(Model model) {
		
		// topページへの日付返却用
		Calendar cal = Calendar.getInstance();
		
		// TODO:【未実装】ログイン中のユーザ情報の取得方法が不明
		// ユーザ情報をViewに渡す
		model.addAttribute("user", "");
		// TODO:【メモ】TOの日付は現在日時
		// TOMの日付をViewに渡す
		model.addAttribute("to", cal.toString());
		// TODO:【メモ】FROMの日付は現在日時の1週間前
		// FROMの日付をViewに渡す
		cal.add(Calendar.DATE, -7);
		model.addAttribute("from", cal.toString());
		
		// トップページのURLを返す
		return "/Top";
	}
	
	
}