/**
 * ファイル名：	CommonService.java
 * 作成日：	2016/11/24
 * 作成者：	k.urabe
 * パッケージ：	dailyReport/service
 */


package dailyReport.service;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.persistence.*;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import dailyReport.Constants;
import dailyReport.resource.RecordContentAdd;
import dailyReport.resource.RecordContentInf;
import dailyReport.resource.UserInf;


/**
 * クラス名：	CommonService
 * 概要：		画面特有以外のリクエストにビジネスロジックをまとめたクラス
 * 作成日：	2016/11/24
 * 作成者：	k.urabe
 */
@Service
@Transactional
public class CommonService {
	
	// EntityManagerをインジェクションする
	@PersistenceContext
	EntityManager entityManager;
	
	/**
	 * 関数名：	checkValue
	 * 概要：		リクエストに使用される各値に対してエスケープ処理を行った値に置き換える
	 * 引数：		Map<String, Object> map
	 * 戻り値：	void
	 * 作成日：	2016/11/24
	 * 作成者：	k.urabe
	 */
	public void checkValue(Map<String, Object> map) {
		
		// 対象のmapを走査して、値に対してエスケープ処理を実行していく。
		for(Map.Entry<String, Object> obj : map.entrySet()) {
			// TODO:【未実装】エスケープの内容
			// エスケープ処理した値を再度値に格納する。
			obj.setValue(obj.getValue().toString().replaceAll("\\'", "\\\\'"));
		}
		
	}
	
	/**
	 * 関数名：	createAddContent
	 * 概要：		コンテンツの追加情報（いいね、未読にする）を新規にDB接続へ登録する
	 * 引数：		Map<String, Object> map
	 * 戻り値：	void
	 * 作成日：	2016/11/25
	 * 作成者：	k.urabe
	 */
	public boolean createAddContent(Map<String, Object> map) {
		
		boolean returnBoolean = true;			// 返却用の真偽値。失敗したらfalse返す
		
		/**
		 * TODO:【未実装】値をセットする部分と、クエリ実行部分に対するメモ
		 * entityクラスを使用しない場合、受け取ったJSONの値から
		 * ネイティブなSQLとバインド変数を使用して実行するパターンが考えられる。
		 * 
		 * Repositoryインターフェースに定義したクエリ（メソッド）を実行し、
		 * entityクラスに格納されている値でinsertするか。
		 * ただし、JPAを使用する限りはentityクラスは必要になる。
		 * 
		 */
		try {
			// entityクラスにJSONから得た値や、固定値となる値をサーバ側でセットする
			// 登録対象のRecordContentAddテーブルのインスタンスを生成する
			RecordContentAdd content = new RecordContentAdd();
			// コンテンツIDとして親のテーブルを取得してセットする
			content.setRecordContentInf(entityManager.find(RecordContentInf.class, (int)map.get(Constants.KEY_CONTENT_ID)));
			// ユーザIDをセットする
			content.setUserId((String)map.get(Constants.KEY_USER_ID));
			// 追加種別をセットする
			content.setAddCategory((int)map.get(Constants.KEY_ADD_CATEGORY));
			// 登録状態をセットする（新規作成なので、サーバ側で値をセット）
			content.setCategoryStatus(1);
		
			// クエリを実行する
			entityManager.persist(content);
		} catch (Exception e) {
			// 処理に失敗した旨を返す
			returnBoolean = false;
		}
		// 成否を呼び出し元に返す
		return returnBoolean;
	}
	
	/**
	 * 関数名：	updateAddContent
	 * 概要：		コンテンツの追加情報（いいね、未読にする）を更新する
	 * 引数：		Map<String, Object> map
	 * 戻り値：	void
	 * 作成日：	2016/11/25
	 * 作成者：	k.urabe
	 */
	public boolean updateAddContent(Map<String, Object> map) {
		
		boolean returnBoolean = true;			// 返却用の真偽値。失敗したらfalse返す
		
		/**
		 * TODO:【未実装】値をセットする部分と、クエリ実行部分に対するメモ
		 * entityクラスを使用しない場合、受け取ったJSONの値から
		 * ネイティブなSQLとバインド変数を使用して実行するパターンが考えられる。
		 * 
		 * Repositoryインターフェースに定義したクエリ（メソッド）を実行し、
		 * entityクラスに格納されている値でinsertするか。
		 * ただし、JPAを使用する限りはentityクラスは必要になる。
		 * 
		 */
		try {
			// entityクラスにJSONから得た値や、固定値となる値をサーバ側でセットする
			// 登録対象のRecordContentAddテーブルに更新対象とするレコードを読み込む
			RecordContentAdd content = entityManager.find(RecordContentAdd.class, (int)map.get(Constants.KEY_ADD_CATEGORY));
			// 更新対象となる登録状態をセットする
			content.setCategoryStatus((int)map.get(Constants.KEY_CATEGORY_STATUS));
		
			// TODO:【メモ】既に当該entityはfindした状態で管理状態にあるので、refreshしなくても、トランザクションが終了すれば反映される
			// クエリの結果を反映する
			entityManager.refresh(content);
		} catch (Exception e) {
			// 処理に失敗した旨を返す
			returnBoolean = false;
		}
		// 成否を呼び出し元に返す
		return returnBoolean;
	}
	
	/**
	 * 関数名：	setResultMessage
	 * 概要：		クライアントへ返却するJSON文字列を作成する
	 * 引数：		String message
	 * 戻り値：	String
	 * 作成日：	2016/11/25
	 * 作成者：	k.urabe
	 */
	public String setResultMessage(String message) {
		
		// 返却用のメッセージを格納するMapを生成する
		Map<String, Object> map = new HashMap<String, Object>();
		// mapに受け取ったメッセージをセットする
		map.put(Constants.STR_MESSAGE, message);
		// mapをJSON文字列に変換して返す
		return this.convertMapToJson(map);
		
	}
	
	/**
	 * 関数名：	convertMapToJson
	 * 概要：		MAPをJSON文字列に変換する
	 * 引数：		MAP
	 * 戻り値：	String
	 * 作成日：	2016/11/25
	 * 作成者：	k.urabe
	 * 参考:		http://blog.pepese.com/entry/20130915/1379222428
	 */
	public String convertMapToJson(Map<String, Object> map) {
		
		//Map<String,String> map = new LinkedHashMap<>();
		ObjectMapper mapper = new ObjectMapper();
		
		String json = "";
		try {
			json = mapper.writeValueAsString(map);
		} catch (Exception e) {
			e.printStackTrace();
		}
	
		return json;
	}
	
	/**
	 * 関数名：	convertJsonToMap
	 * 概要：		JSON文字列をMAPに変換する
	 * 引数：		String
	 * 戻り値：	MAP
	 * 作成日：	2016/11/25
	 * 作成者：	k.urabe
	 * 参考:		http://blog.pepese.com/entry/20130915/1379222428
	 */
	public Map<String, Object> convertJsonToMap(String json) {
		
		Map<String,Object> map = new LinkedHashMap<>();
		ObjectMapper mapper = new ObjectMapper();
		
		try {
			map = mapper.readValue(json, new TypeReference<LinkedHashMap<String,Object>>(){});
		} catch (Exception e) {
			e.printStackTrace();
		}

		return map;
	}
	
	/**
	 * 関数名：	userAuth
	 * 概要：		ユーザ認証用
	 * 引数：		String
	 * 戻り値：	UserInf
	 * 作成日：	2016/11/28
	 * 作成者：	k.urabe
	 */
	public UserInf userAuth(String username) {
		// 入力されたログインユーザの情報を返す
		return entityManager.find(UserInf.class, username);
	}
}
