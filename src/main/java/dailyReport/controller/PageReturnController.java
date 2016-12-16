package dailyReport.controller;

import java.security.Principal;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import dailyReport.Constants;
import dailyReport.service.CommonService;
import dailyReport.service.UserService;

/**
 * クラス名：	PageReturnController
 * 概要：		ページを返すタイプのリクエストを処理するパラメータ
 * 作成日：	2016/11/24
 * 作成者：	k.urabe
 */
@Controller
public class PageReturnController {

	@Autowired
	CommonService commonService;
	@Autowired
	UserService userService;
	
	/**
	 * 関数名：	requestTopPage
	 * 概要：		topページへのリクエスト
	 * 引数：		なし
	 * 戻り値：	String
	 * 作成日：	2016/11/24
	 * 作成者：	k.urabe
	 */
	@RequestMapping(value = "/Top", method = RequestMethod.GET)
	public String requestTopPage(Model model, Principal principal) {
		
		// topページへの日付返却用にCalendarインスタンスを生成する
		Calendar cal = Calendar.getInstance();
		// 日付のフォーマットパターンを指定するためSimpleDateFormatのインスタンスを取得する
		SimpleDateFormat simple = new SimpleDateFormat(Constants.DATE_FORMAT);
		
		// ユーザ情報をViewに渡す
		model.addAttribute("user", commonService.getUserName(principal.getName()));
		// TODO:【メモ】TOの日付は現在日時
		// TOMの日付をViewに渡す
		model.addAttribute("to", simple.format(cal.getTime()));
		// TODO:【メモ】FROMの日付は現在日時の1週間前
		// FROMの日付をViewに渡す
		//cal.add(Calendar.DATE, -7);
		// デバッグ用多めの日付
		cal.add(Calendar.DATE, -60);
		model.addAttribute("from", simple.format(cal.getTime()));
		
		// トップページのURLを返す
		return "/Top";
	}
	
	/**
	 * 関数名：	requestTopEditPage
	 * 概要：		topページへのリクエスト
	 * 引数：		なし
	 * 戻り値：	String
	 * 作成日：	2016/11/24
	 * 作成者：	k.urabe
	 */
	@RequestMapping(value = "/editWindow", method = RequestMethod.GET)
	public String requestTopEditPage(Model model) {

		// 画面に渡すmodelに会社情報のリストを渡す
		model.addAttribute("companyList", userService.searchCompanyList());
		// 画面に渡すmodelに部署情報のリストを渡す
		model.addAttribute("departmentList", userService.searchDepartmentList());
		// 画面に渡すmodelに役職情報のリストを渡す
		model.addAttribute("positionList", userService.searchPositionList());
		
		// トップページのURLを返す
		return "/userEditWindow";
	}
	
	/**
	 * 関数名：	requestAnotherWindow
	 * 概要：		別ウインドウ用のHTMLを返す
	 * 引数：		パラメータ String htmlPath
	 * 戻り値：	String
	 * 作成日：	2016/11/24
	 * 作成者：	k.urabe
	 */
	@RequestMapping(value = "createWindow/{htmlPath}", method = RequestMethod.GET)
	public String requestAnotherWindow(Model model, @PathVariable("htmlPath") String htmlPath, Principal principal) {
		
		// topページへの日付返却用にCalendarインスタンスを生成する
		Calendar cal = Calendar.getInstance();
		// 日付のフォーマットパターンを指定するためSimpleDateFormatのインスタンスを取得する
		SimpleDateFormat simple = new SimpleDateFormat(Constants.DATE_FORMAT);
		
		// ユーザ情報をViewに渡す
		model.addAttribute("user", commonService.getUserName(principal.getName()));
		// 新規コメントや日報のために当日日付をViewに渡す
		model.addAttribute("today", simple.format(cal.getTime()));
		
		// リクエストに含まれているページを返す
		return "createWindow/" + htmlPath;
	}
	
	/**
	 * 関数名：	requestIndexPage
	 * 概要：		indexページへのリクエスト
	 * 引数：		なし
	 * 戻り値：	String
	 * 作成日：	2016/12/12
	 * 作成者：	k.urabe
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String requestIndexPage() {

		// indexページのURLを返す
		return "/index";
	}
	
	/**
	 * 関数名：	requestUserWindow
	 * 概要：		ユーザ関連の別ウインドウリクエストのマッピングクラス
	 * 引数：		なし
	 * 戻り値：	String
	 * 作成日：	2016/12/12
	 * 作成者：	k.urabe
	 */
	@RequestMapping(value = "/userWindow/{htmlPath}", method = RequestMethod.GET)
	public String requestUserWindow(Model model, @PathVariable("htmlPath") String htmlPath, Principal principal) {

		// pathが編集画面か検証
		if(htmlPath.equals(Constants.USER_EDIT_WINDOW)) {
			// 画面に渡すmodelに会社情報のリストを渡す
			model.addAttribute("companyList", userService.searchCompanyList());
			// 画面に渡すmodelに部署情報のリストを渡す
			model.addAttribute("departmentList", userService.searchDepartmentList());
			// 画面に渡すmodelに役職情報のリストを渡す
			model.addAttribute("positionList", userService.searchPositionList());
		}
		
		// リクエストに含まれているページを返す
		return "userWindow/" + htmlPath;
	}
	
}
