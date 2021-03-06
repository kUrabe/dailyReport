package dailyReport.service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dailyReport.Constants;
import dailyReport.resource.ChartViewRecord;
import dailyReport.resource.FixedItemInf;
import dailyReport.resource.GetContentByDayQuery;
import dailyReport.resource.GetReportByDayQuery;
import dailyReport.resource.RecordContentAdd;
import dailyReport.resource.RecordContentDetail;
import dailyReport.resource.RecordContentInf;
import dailyReport.resource.SearchContentDetailSummary;
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
	 * 戻り値：	List<GetReportByDayQuery
	 * 作成日：	2016/11/25
	 * 作成者：	k.urabe
	 */
	// TODO:【未実装】entityクラスはこれでよいか未検証。今はダミーとしてテーブル単体のものを指定している。
	public List<GetReportByDayQuery> getContentByDay(Map<String, Object> map) {

		// jsonから取得したコンテンツIDと登録書式で情報を取得する
		@SuppressWarnings("unchecked")
		List<GetReportByDayQuery> content = entityManager
				.createNativeQuery(Constants.GET_REPORT_BY_DYA, "getReportByDayQuery")
				.setParameter(1, map.get(Constants.KEY_USER_ID).toString())
				.setParameter(2, Integer.parseInt(map.get(Constants.KEY_ENTRY_FORMAT).toString()))
				.setParameter(3, map.get(Constants.KEY_DATE).toString())
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
		String tmp;								// 一時的にキー名を保持する変数
		
		// JSONから取得した日付をentityクラスのdate型プロパティへ格納するための日付変換インスタンスを生成する
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		
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
			parent_content.setBaseParentContentId(new Integer((String)map.get(Constants.KEY_BASE_PARENT_CONTENT_ID)));
			// （親）祖先コンテンツIDをセットする
			parent_content.setGrandParentContentId(new Integer((String)map.get(Constants.KEY_GRAND_PARENT_CONTENT_ID)));
			// （親）親コンテンツIDをセットする
			parent_content.setParentContentId(new Integer((String)map.get(Constants.KEY_PARENT_CONTENT_ID)));
			
			//if(!(map.get(Constants.KEY_DATE).toString().equals("0000-00-00"))) {
				// （親）報告日をセットする
				parent_content.setReportDate(sdf.parse((String)map.get(Constants.KEY_DATE)));
			//}
			
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
					
					// コンテンツIDとして親のテーブルを取得してセットする
					content.setRecordContentInf(parent_content);
					
					// 子要素の中を走査する
					//for(Map.Entry<String, String> childObj : childmap.entrySet()) {
					for(Map.Entry<String, Object> childmap : ((Map<String, Object>) obj.getValue()).entrySet()) {
						
						
						// 現在のキー名を取得する
						tmp = childmap.getKey();
						// キー名がnumberであれば
						if(tmp.equals(Constants.KEY_NUMBER.toString())) {
							// 詳細IDに値をセットする
							content.setDetailId(new Integer(childmap.getValue().toString()));
						// キー名が固定IDであれば
						} else if(tmp.equals(Constants.KEY_FIXED_ITEM_ID.toString())) {
							// 固定IDをセットする
							content.setFixedItemInf(entityManager.find(FixedItemInf.class, new Integer(childmap.getValue().toString())));
						// キー名が項目名であれば
						} else if(tmp.equals(Constants.KEY_INDEX_AREA.toString())) {
							// 項目名をセットする
							content.setIndexName((String)childmap.getValue());
						// キー名が内容であれば
						} else if(tmp.equals(Constants.KEY_MAIN_TEXT.toString())) {
							// 内容をセットする
							content.setMainText((String)childmap.getValue());
						}

					}
					// （子）クエリを実行する
					entityManager.persist(content);
					// （子）次レコード用の新規entityインスタンスを作成する。
					content = new RecordContentDetail();

				}
				
			}

		} catch (Exception e) {
			// 処理に失敗した旨を返す
			returnBoolean = false;
			e.getMessage();
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
	 * @throws ParseException 
	 */
	// TODO:【未実装】entityクラスはこれでよいか未検証。今はダミーとしてテーブル単体のものを指定している。
	public List<GetContentByDayQuery> getBeforeContent(Map<String, Object> map) throws ParseException {
		
		// JSONから取得した日付をentityクラスのdate型プロパティへ格納するための日付変換インスタンスを生成する
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

		// jsonから取得したコンテンツIDと登録書式で情報を取得する
		List<GetContentByDayQuery> content = entityManager
				.createNativeQuery(Constants.GET_CONTENT_BY_DAY, "getContentByDayQuery")
				.setParameter(1, (String)map.get(Constants.KEY_USER_ID))
				.setParameter(2, sdf.parse((String)map.get(Constants.KEY_DATE)))
				.setParameter(3, (String)map.get(Constants.KEY_INDEX_NAME))
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
		String tmp;								// 一時的にキー名を保持する変数
		
		try {
			
			// クライアントから受けたコンテンツIDで紐付くコンテンツ情報を取得する
			RecordContentInf parent_content = entityManager.find(RecordContentInf.class, new Integer(map.get(Constants.KEY_CONTENT_ID).toString()));
			
			// （親）登録書式をセットする
			parent_content.setEntryFormat((int)map.get(Constants.KEY_ENTRY_FORMAT));
			// （親）登録状態をセットする
			parent_content.setEntryStatus((int)map.get(Constants.KEY_ENTRY_STATUS));
			// （親）基底親コンテンツIDをセットする
			parent_content.setBaseParentContentId(new Integer((String)map.get(Constants.KEY_BASE_PARENT_CONTENT_ID)));
			// （親）祖先コンテンツIDをセットする
			parent_content.setGrandParentContentId(new Integer((String)map.get(Constants.KEY_GRAND_PARENT_CONTENT_ID)));
			// （親）親コンテンツIDをセットする
			parent_content.setParentContentId(new Integer((String)map.get(Constants.KEY_PARENT_CONTENT_ID)));
			
			// （親）更新日をセットする
			parent_content.setUpdateDated(new Date());	
			// （親）クエリを実行する
			entityManager.persist(parent_content);
			
			// 子の情報を一旦すべて削除する
			entityManager
				.createNativeQuery(Constants.CONTENT_DELETE)
				.setParameter(1, new Integer(map.get(Constants.KEY_CONTENT_ID).toString()))
				.setParameter(2, new Integer(map.get(Constants.KEY_ENTRY_FORMAT).toString()))
				.executeUpdate();
			
			
			// TODO:【未実装】子要素（詳細テーブル）は複数レコードになる。それを1レコードのみの情報テーブルと同時にやるのは難しい？ リクエスト2つか、JSON2つはどうか。
			// （子）登録対象のRecordContentAddテーブルのインスタンスを生成する
						RecordContentDetail content = new RecordContentDetail();
						
						// 対象のmapを走査して、値がオブジェクトのものを探す
						for(Map.Entry<String, Object> obj : map.entrySet()) {
							
							// 値がobjectか判定する
							if(obj.getValue() instanceof Map<?, ?>) {
								// objをmapに変換する
								//Map<String, String> childmap = (HashMap<String, String>) obj;
								// 子要素の中を走査する
								//for(Map.Entry<String, String> childObj : childmap.entrySet()) {
								for(Map.Entry<String, Object> childmap : ((Map<String, Object>) obj.getValue()).entrySet()) {
									
									// コンテンツIDとして親のテーブルを取得してセットする
									content.setRecordContentInf(parent_content);
									// 現在のキー名を取得する
									tmp = childmap.getKey();
									// キー名がnumberであれば
									if(tmp.equals(Constants.KEY_NUMBER.toString())) {
										// 詳細IDに値をセットする
										content.setDetailId(new Integer(childmap.getValue().toString()));
									// キー名が固定IDであれば
									} else if(tmp.equals(Constants.KEY_FIXED_ITEM_ID.toString())) {
										// 固定IDをセットする
										content.setFixedItemInf(entityManager.find(FixedItemInf.class, new Integer(childmap.getValue().toString())));
									// キー名が項目名であれば
									} else if(tmp.equals(Constants.KEY_INDEX_AREA.toString())) {
										// 項目名をセットする
										content.setIndexName((String)childmap.getValue());
									// キー名が内容であれば
									} else if(tmp.equals(Constants.KEY_MAIN_TEXT.toString())) {
										// 内容をセットする
										content.setMainText((String)childmap.getValue());
									}

								}
								
								// （子）クエリを実行する
								entityManager.persist(content);
								// （子）次レコード用の新規entityインスタンスを作成する。
								content = new RecordContentDetail();
							}
							
						}
			
		} catch (Exception e) {
			// 処理に失敗した旨を返す
			returnBoolean = false;
		}
		
		return returnBoolean;
	}
	
	/**
	 * 関数名：	getChartViewContent
	 * 概要：		日報作成画面で、初期表示時（編集機能で日付を持っていた場合）や、日付選択時のリクエストに対して情報を取得する
	 * 引数：		Map<String, Object> map
	 * 戻り値：	List<GetReportByDayQuery
	 * 作成日：	2016/11/25
	 * 作成者：	k.urabe
	 */
	// TODO:【未実装】entityクラスはこれでよいか未検証。今はダミーとしてテーブル単体のものを指定している。
	public List<ChartViewRecord> getChartViewContent(Map<String, Object> map) {

		// グラフ情報取得用のベースとなるクエリを取得する
		String query = Constants.GET_CHART_RECORD;
		// FROMの入力値を保持する
		String fromValue = map.get(Constants.KEY_SERACH_FROM_DATE).toString();
		// TOの入力値を保持する
		String toValue = map.get(Constants.KEY_SERACH_TO_DATE).toString();
		int entryFormatValue = new Integer(map.get(Constants.KEY_ENTRY_FORMAT).toString());
		
		// クライアントでFROMに入力がされているか検証
		if(fromValue != "") {
			// クエリに検索条件を追加する
			query += Constants.STR_SEARCH_FROM_REPORT_DATE + Constants.STR_SINGLE + fromValue + Constants.STR_SINGLE;
		}
		// クライアントでFROMに入力がされているか検証
		if(toValue != "") {
			// クエリに検索条件を追加する
			query += Constants.STR_SEARCH_TO_REPORT_DATE + Constants.STR_SINGLE + toValue + Constants.STR_SINGLE;
		}
		// クライアントでentry_formatにチェックが付いている、かつ両方にチェックが付いている
		if(entryFormatValue != 0 && (entryFormatValue & Constants.FLAG_ENTRY_FORMAT_REPORT_AND_COMMENT) == Constants.FLAG_ENTRY_FORMAT_REPORT_AND_COMMENT) {
			// 対象のクエリを追加する
			query += Constants.STR_ENTRY_FORMAT_STR_ENTRY_FORMAT_REPORT_AND_COMMENT;
		// クライアントでentry_formatにチェックが付いている、かつ日報にチェックが付いている
		} else if(entryFormatValue != 0 && (entryFormatValue & Constants.FLAG_ENTRY_FORMAT_REPORT) == Constants.FLAG_ENTRY_FORMAT_REPORT) {
			// 対象のクエリを追加する
			query += Constants.STR_ENTRY_FORMAT_REPORT;
		// クライアントでentry_formatにチェックが付いている、かつコメントにチェックが付いている
		} else if(entryFormatValue != 0 && (entryFormatValue & Constants.FLAG_ENTRY_FORMAT_COMMENT) == Constants.FLAG_ENTRY_FORMAT_COMMENT) {
			// 対象のクエリを追加する
			query += Constants.STR_ENTRY_FORMAT_COMMENT;
		}
		
		// クエリに共通のものを追加する
		query += Constants.STR_GRUOUP_BY_USER_ID;
		
		// 作成したクエリを実行し、必要なデータを取得する
		@SuppressWarnings("unchecked")
		List<ChartViewRecord> content = entityManager
				.createNativeQuery(query, "chartViewRecord")
				.getResultList();
		
		// 取得した情報を返す
		return content;
		
	}
	
}
