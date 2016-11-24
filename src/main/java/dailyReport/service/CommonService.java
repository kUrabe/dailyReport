/**
 * ファイル名：	CommonService.java
 * 作成日：	2016/11/24
 * 作成者：	k.urabe
 * パッケージ：	dailyReport/service
 */


package dailyReport.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * クラス名：	CommonService
 * 概要：		画面特有以外のリクエストにビジネスロジックをまとめたクラス
 * 作成日：	2016/11/24
 * 作成者：	k.urabe
 */
@Service
@Transactional
public class CommonService {
	
	/**
	 * 関数名：	checkValue
	 * 概要：		リクエストに使用される各値に対してエスケープ処理を行った値に置き換える
	 * 引数：		Map<String, Object> json	走査対象のJsonMap
	 * 戻り値：	void
	 * 作成日：	2016/11/24
	 * 作成者：	k.urabe
	 */
	public void checkValue(Map<String, Object> json) {
		
		// 対象のmapを走査して、値に対してエスケープ処理を実行していく。
		for(Map.Entry<String, Object> obj : json.entrySet()) {
			// 
			obj.setValue(obj.getValue());
		}
		
		
	}
	
	public boolean createAddContent(Map<String, Object> json) {
		
		return false;
	}
	
	public boolean updateAddContent(Map<String, Object> json) {
		
		return false;
	}
	
	public String setResultMessage(String message) {
		
		return "";
	}
	
	public String convertMapToJson(Map<String, Object> json) {
		
		return "";
	}
	
	public Map<String, Object> convertJsonToMap(String json) {
		// エラー消す用のダミー
		Map<String, Object> map = new HashMap<String, Object>();
		// TODO:【未実装】jacksonが使えていない。Springでは違うもの使う？　それともインポートする？
		//Map<String, Object> map = (Map<String, Object>)JSON.decode(json);
		
		// エラー消す用のダミー
		return map;
	}
	
}
