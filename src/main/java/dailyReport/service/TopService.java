package dailyReport.service;

import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dailyReport.Constants;
import dailyReport.resource.RecordContentDetail;
import dailyReport.resource.RecordContentInf;

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
	
	/**
	 * 関数名：	searchTopPageContent
	 * 概要：		TOP画面の初期表示や、検索実行時に概要部分を取得する
	 * 引数：		Map<String, Object> json
	 * 戻り値：	RecordContentInf
	 * 作成日：	2016/11/25
	 * 作成者：	k.urabe
	 */
	// TODO:【未実装】entityクラスはこれでよいか未検証。今はダミーとしてテーブル単体のものを指定している。
	public List<RecordContentInf> searchTopPageContent(Map<String, Object> map) {
		// TODO:【未実装】Countなど使用について不明点があるため保留
		// TODO:【未実装】なお、Countなどをとることにより、Entityクラスの型から外れてしまう。その場合はどうするか
		// 現状はCountの部分以外を実装
		List<RecordContentInf> content = entityManager
				.createNamedQuery("TopSearchContentQuery", RecordContentInf.class)
				.setParameter("serach_user", map.get(Constants.KEY_SERACH_USER))
				.setParameter("serach_note", map.get(Constants.KEY_SERACH_NOTE))
				.setParameter("serach_from_date", map.get(Constants.KEY_SERACH_FROM_DATE))
				.setParameter("serach_to_date", map.get(Constants.KEY_SERACH_TO_DATE))
				.setParameter("serach_read", map.get(Constants.KEY_SERACH_READ))
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
	public List<RecordContentDetail> searchTopPageDetailContent(Map<String, Object> map) {
		
		// jsonから取得したコンテンツIDと登録書式で情報を取得する
		List<RecordContentDetail> content = entityManager
				.createNamedQuery("getContentDetailQuery", RecordContentDetail.class)
				.setParameter("content_id", map.get(Constants.KEY_CONTENT_ID))
				.setParameter("entry_format", map.get(Constants.KEY_ENTRY_FORMAT))
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
