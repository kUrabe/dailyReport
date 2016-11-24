/**
 * ファイル名：	LoginController.java
 * 作成日：	2016/11/24
 * 作成者：	k.urabe
 * パッケージ：	dailyReport/controller
 */

package dailyReport.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * クラス名：	LoginController
 * 概要：		ログイン関連のコントローラ機能を取りまとめたクラス
 * 作成日：	2016/11/24
 * 作成者：	k.urabe
 */
@Controller
public class LoginController {

	/**
	 * 関数名：	requestLoguinPage
	 * 概要：		loginFormに対するリクエストをマッピングして、ログインフォームのURLを返す
	 * 引数：		なし
	 * 戻り値：	String
	 * 作成日：	2016/11/24
	 * 作成者：	k.urabe
	 */
	@RequestMapping("loginForm")
	public String requestLoguinPage() {
		// TODO:【未実装】Spring Securityを用いた認証部分
		// URLを返す
		return "login/loginForm";
	}
}
