package dailyReport.service;

import java.text.DateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dailyReport.Constants;
import dailyReport.resource.FixedItemInf;
import dailyReport.resource.RecordContentAdd;
import dailyReport.resource.RecordContentDetail;
import dailyReport.resource.RecordContentInf;
import dailyReport.resource.UserInf;


/**
 * クラス名：	CreateService
 * 概要：		作成画面（日報、コメント）のリクエストにビジネスロジックをまとめたクラス
 * 作成日：	2016/11/24
 * 作成者：	k.urabe
 */
@Service
@Transactional
public class CreateService {
	
	// EntityManagerをインジェクションする
	@PersistenceContext
	EntityManager entityManager;
	
	/**
	 * 関数名：	getContentByDay
	 * 概要：		日報作成画面で、初期表示時（編集機能で日付を持っていた場合）や、日付選択時のリクエストに対して情報を取得する
	 * 引数：		Map<String, Object> map
	 * 戻り値：	RecordContentDetail
	 * 作成日：	2016/11/25
	 * 作成者：	k.urabe
	 */
	// TODO:【未実装】entityクラスはこれでよいか未検証。今はダミーとしてテーブル単体のものを指定している。
	public List<RecordContentDetail> getContentByDay(Map<String, Object> map) {
		
		// クライアントから受けたユーザIDを日付で日報があるか検索する
		List<RecordContentDetail> content = entityManager
				.createNamedQuery("getReportByDayQuery", RecordContentDetail.class)
				.setParameter("user_id", map.get(Constants.KEY_USER_ID))
				.setParameter("report_date", map.get(Constants.KEY_DATE))
				.getResultList();
		// 取得した情報を返す
		return content;
		
	}
	
	/**
	 * 関数名：	createContent
	 * 概要：		作成画面（日報、コメント）の新規登録
	 * 引数：		Map<String, Object> map
	 * 戻り値：	boolean
	 * 作成日：	2016/11/25
	 * 作成者：	k.urabe
	 */
	public boolean createContent(Map<String, Object> map) {

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
			
			// （親）登録対象のRecordContentInfテーブルのインスタンスを生成する
			// 主キーのコンテンツIDはautoインクリメント
			RecordContentInf parent_content = new RecordContentInf();
			// （親）ユーザIDをセットする(JSON内にあるUserIDからentityを取得する)
			parent_content.setUserInf(entityManager.find(UserInf.class, (String)map.get(Constants.KEY_USER_ID)));
			// （親）登録書式をセットする
			parent_content.setEntryFormat((int)map.get(Constants.KEY_ENTRY_FORMAT));
			// （親）登録状態をセットする
			parent_content.setEntryStatus((int)map.get(Constants.KEY_ENTRY_STATUS));
			// （親）基底親コンテンツIDをセットする
			parent_content.setBaseParentContentId((int)map.get(Constants.KEY_BASE_PARENT_CONTENT_ID));
			// （親）祖先コンテンツIDをセットする
			parent_content.setGrandParentContentId((int)map.get(Constants.KEY_GRAND_PARENT_CONTENT_ID));
			// （親）親コンテンツIDをセットする
			parent_content.setParentContentId((int)map.get(Constants.KEY_PARENT_CONTENT_ID));
			// （親）報告日をセットする
			parent_content.setReportDate(DateFormat.getDateInstance().parse((String)map.get(Constants.KEY_REPORT_DATE)));
			// （親）作成日をセットする
			parent_content.setCreateDate(new Date());
			// （親）更新日をセットする
			parent_content.setUpdateDated(new Date());
			
			// （親）クエリを実行する
			entityManager.persist(parent_content);
			
			
			// TODO:【未実装】子要素（詳細テーブル）は複数レコードになる。それを1レコードのみの情報テーブルと同時にやるのは難しい？ リクエスト2つか、JSON2つはどうか。
			// （子）登録対象のRecordContentAddテーブルのインスタンスを生成する
			RecordContentDetail content = new RecordContentDetail();
			
			// 対象のmapを走査して、値がオブジェクトのものを探す
			for(Map.Entry<String, Object> obj : map.entrySet()) {
				
				// 値がobjectか判定する
				if(obj.getValue() instanceof Map<?, ?>) {
					// objをmapに変換する
					Map<String, Object> childmap = (Map<String, Object>)obj;
					// 子要素の中を走査する
					for(Entry<String, Object> childObj : childmap.entrySet()) {
						// コンテンツIDとして親のテーブルを取得してセットする
						content.setRecordContentInf(parent_content);
						// 詳細IDをセットする
						content.setDetailId((int)childmap.get(Constants.KEY_DETAIL_ID));
						// 固定項目IDをセットする
						content.setFixedItemInf(entityManager.find(FixedItemInf.class, (int)childmap.get(Constants.KEY_FIXED_ITEM_ID)));
						// 項目名をセットする
						content.setIndexName((String)childmap.get(Constants.KEY_INDEX_NAME));
						// 内容をセットする
						content.setMainText((String)childmap.get(Constants.KEY_MAIN_TEXT));
					}
				}
				
			}

			// TODO:【メモ】こちらのentityは管理状態になっていないはずなので、persistが動くはず。
			// （子）クエリを実行する
			entityManager.persist(content);
			
		} catch (Exception e) {
			// 処理に失敗した旨を返す
			returnBoolean = false;
		}
		// 成否を呼び出し元に返す
		return returnBoolean;
		
	}
	
	/**
	 * 関数名：	getBeforeContent
	 * 概要：		全日以前の日報（予定）を取得する
	 * 引数：		Map<String, Object> map
	 * 戻り値：	RecordContentDetail
	 * 作成日：	2016/11/25
	 * 作成者：	k.urabe
	 */
	// TODO:【未実装】entityクラスはこれでよいか未検証。今はダミーとしてテーブル単体のものを指定している。
	public List<RecordContentDetail> getBeforeContent(Map<String, Object> map) {
		
		// クライアントから受けたユーザIDを日付で日報があるか検索する
		List<RecordContentDetail> content = entityManager
				.createNamedQuery("getBeforePlanQuery", RecordContentDetail.class)
				.setParameter("user_id", map.get(Constants.KEY_USER_ID))
				.setParameter("report_date", map.get(Constants.KEY_DATE))
				.getResultList();
		
		// 検索結果を返す
		return content;
	}
	
	// createContentへ統合（不要）
	public boolean createTemplate(Map<String, Object> json) {
		
		return false;
	}
	
	/**
	 * 関数名：	updateContent
	 * 概要：		コンテンツ（日報・コメント）を更新する
	 * 引数：		Map<String, Object> map
	 * 戻り値：	RecordContentDetail
	 * 作成日：	2016/11/27
	 * 作成者：	k.urabe
	 */
	public boolean updateContent(Map<String, Object> map) {
		
		boolean returnBoolean = true;			// 返却用の真偽値。失敗したらfalse返す
		
		try {
			
			// クライアントから受けたコンテンツIDで紐付くコンテンツ情報を取得する
			RecordContentInf parent_content = entityManager.find(RecordContentInf.class, (String)map.get(Constants.KEY_CONTENT_ID));
			// （親）更新日をセットする
			parent_content.setUpdateDated(new Date());	
			// （親）クエリを実行する
			entityManager.persist(parent_content);
			
			
			// TODO:【未実装】子要素（詳細テーブル）は複数レコードになる。それを1レコードのみの情報テーブルと同時にやるのは難しい？ リクエスト2つか、JSON2つはどうか。
			// （子）登録対象のRecordContentAddテーブルのインスタンスを生成する
			RecordContentDetail content = new RecordContentDetail();
			
			// 対象のmapを走査して、値がオブジェクトのものを探す
			for(Map.Entry<String, Object> obj : map.entrySet()) {
				
				// 値がobjectか判定する
				if(obj.getValue() instanceof Map<?, ?>) {
					// objをmapに変換する
					Map<String, Object> childmap = (Map<String, Object>)obj;
					// 子要素の中を走査する
					for(Entry<String, Object> childObj : childmap.entrySet()) {
						// コンテンツIDとして親のテーブルを取得してセットする
						content.setRecordContentInf(parent_content);
						// 詳細IDをセットする
						content.setDetailId((int)childmap.get(Constants.KEY_DETAIL_ID));
						// 固定項目IDをセットする
						content.setFixedItemInf(entityManager.find(FixedItemInf.class, (int)childmap.get(Constants.KEY_FIXED_ITEM_ID)));
						// 項目名をセットする
						content.setIndexName((String)childmap.get(Constants.KEY_INDEX_NAME));
						// 内容をセットする
						content.setMainText((String)childmap.get(Constants.KEY_MAIN_TEXT));
					}
				}
				
			}

			// TODO:【メモ】こちらのentityは管理状態になっていないはずなので、persistが動くはず。
			// （子）クエリを実行する
			entityManager.persist(content);
			
		} catch (Exception e) {
			// 処理に失敗した旨を返す
			returnBoolean = false;
		}
		
		return returnBoolean;
	}
	
	// updateContentへ統合（不要）
	public boolean updateTemplate(Map<String, Object> json) {
		
		return false;
	}
	
}
