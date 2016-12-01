package dailyReport.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dailyReport.Constants;
import dailyReport.resource.RecordContentDetail;
import dailyReport.resource.RecordContentInf;
import dailyReport.resource.SearchContentDetailSummary;
import dailyReport.resource.TopSearchContentSummary;

/**
 * クラス名：	TopService
 * 概要：		Top画面のリクエストにビジネスロジックをまとめたクラス
 * 作成日：	2016/11/24
 * 作成者：	k.urabe
 */
@Service
@Transactional
public class TopService {

	// EntityManagerをインジェクションする
	@PersistenceContext
	EntityManager entityManager;
	
	// 既読検索クエリ用の検索文字列を返すためのマップ
	private Map<String, String> read = new HashMap<String, String>();
	// 未読検索クエリ用の検索文字列を返すためのマップ
	private Map<String, String> note = new HashMap<String, String>();
	
	// コンストラクタ
	public TopService() {
		// 既読検索「含んで表示」の際のクエリを登録
		read.put(Constants.STR_READ_NOTE_IN, Constants.STR_QUERY_READ_IN);
		// 既読検索「除いて表示」の際のクエリを登録
		read.put(Constants.STR_READ_NOTE_OUT, Constants.STR_QUERY_READ_OUT);
		// 既読検索「のみ表示」の際のクエリを登録
		read.put(Constants.STR_READ_NOTE_ONLY, Constants.STR_QUERY_READ_ONLY);
		
		// 未読検索「含んで表示」の際のクエリを登録
		note.put(Constants.STR_READ_NOTE_IN, Constants.STR_QUERY_NOTE_IN);
		// 未読検索「除いて表示」の際のクエリを登録
		note.put(Constants.STR_READ_NOTE_OUT, Constants.STR_QUERY_NOTE_OUT);
		// 未読検索「のみ表示」の際のクエリを登録
		note.put(Constants.STR_READ_NOTE_ONLY, Constants.STR_QUERY_NOTE_ONLY);
	}
	
	/**
	 * 関数名：	searchTopPageContent
	 * 概要：		TOP画面の初期表示や、検索実行時に概要部分を取得する
	 * 引数：		Map<String, Object> json
	 * 戻り値：	RecordContentInf
	 * 作成日：	2016/11/25
	 * 作成者：	k.urabe
	 * @throws ParseException 
	 */
	public List<TopSearchContentSummary> searchTopPageContent(Map<String, Object> map) throws ParseException {

		String plusQuery = "";				// 既読と下書の検索条件に合わせた追加のクエリを格納
		
		// 既読の検索条件を判定する
		if(read.containsKey(map.get(Constants.KEY_SERACH_READ))) {
			// マッピングされたクエリ文字列を追加する
			plusQuery += read.get(map.get(Constants.KEY_SERACH_READ));
		}
		// 未読の検索条件を判定する
		if(note.containsKey(map.get(Constants.KEY_SERACH_NOTE))) {
			// マッピングされたクエリ文字列を追加する
			plusQuery += note.get(map.get(Constants.KEY_SERACH_NOTE));
		}
		
		// JSONから取得した日付をentityクラスのdate型プロパティへ格納するための日付変換インスタンスを生成する
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		
		// 検索条件を含んだ情報取得のクエリを実行する。
		@SuppressWarnings("unchecked")
		List<TopSearchContentSummary> content = entityManager.createNativeQuery(
				Constants.TOP_SEARCH_CONTENT_SUMMARY
				+ plusQuery
				,"topSearchContentSummary")
				.setParameter(1, (String)map.get(Constants.KEY_USER_ID))
				.setParameter(2, "%" + (String)map.get(Constants.KEY_SERACH_USER) + "%")
				.setParameter(3, sdf.parse((String)map.get(Constants.KEY_SERACH_FROM_DATE)))
				.setParameter(4, sdf.parse((String)map.get(Constants.KEY_SERACH_TO_DATE)))
				.getResultList();
		
		// 取得した情報を返す
		return content;
	}
	
	/**
	 * 関数名：	searchTopPageDetailContent
	 * 概要：		TOP画面のアコーディオンを開いた際に、詳細な内容を取得する
	 * 引数：		Map<String, Object> map
	 * 戻り値：	RecordContentDetail
	 * 作成日：	2016/11/25
	 * 作成者：	k.urabe
	 */
	// TODO:【未実装】entityクラスはこれでよいか未検証。今はダミーとしてテーブル単体のものを指定している。
	public List<SearchContentDetailSummary> searchTopPageDetailContent(Map<String, Object> map) {
		
		
		
		// jsonから取得したコンテンツIDと登録書式で情報を取得する
		@SuppressWarnings("unchecked")
		List<SearchContentDetailSummary> content = entityManager
				.createNativeQuery(Constants.SEARCH_CONTENT_DETAIL_SUMMARY, "searchContentDetailSummary")
				.setParameter(1, Integer.parseInt((String)map.get(Constants.KEY_CONTENT_ID)))
				.setParameter(2, Integer.parseInt((String)map.get(Constants.KEY_ENTRY_FORMAT)))
				.setParameter(3, Integer.parseInt((String)map.get(Constants.KEY_ENTRY_STATUS)))
				.getResultList();
		
		// 取得した情報を返す
		return content;
		
	}
	
	/**
	 * 関数名：	logcalDeleteContent
	 * 概要：		コンテンツ（日報、コメント）の論理削除を行う。
	 * 引数：		Map<String, Object> map
	 * 戻り値：	boolean
	 * 作成日：	2016/11/25
	 * 作成者：	k.urabe
	 */
	public boolean logcalDeleteContent(Map<String, Object> map) {
		
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
			// 登録対象のRecordContentInfテーブルに更新対象とするレコードを読み込む
			RecordContentInf content = entityManager.find(RecordContentInf.class, (int)map.get(Constants.KEY_CONTENT_ID));
			// 更新対象となる登録状態をセットする
			content.setEntryStatus(4);
		
			// TODO:【メモ】既に当該entityはfindした状態で管理状態にあるので、refreshしなくても、トランザクションが終了すれば反映される
			// クエリを実行する
			entityManager.refresh(content);
		} catch (Exception e) {
			// クエリの結果を反映する
			returnBoolean = false;
		}
		// 成否を呼び出し元に返す
		return returnBoolean;
		
	}
	
	/**
	 * 関数名：	physicalDeleteContent
	 * 概要：		コンテンツ（日報）の下書きの物理削除を行う。
	 * 引数：		Map<String, Object> map
	 * 戻り値：	boolean
	 * 作成日：	2016/11/25
	 * 作成者：	k.urabe
	 */
	public boolean physicalDeleteContent(Map<String, Object> map) {
		
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
			// 処理対象のRecordContentAddテーブルに削除対象とするレコードを読み込む
			RecordContentInf content = entityManager.find(RecordContentInf.class, (int)map.get(Constants.KEY_CONTENT_ID));
			// 対象のコンテンツを削除する
			entityManager.remove(content);
		
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
	
	
}
