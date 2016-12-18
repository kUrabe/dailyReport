package dailyReport.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.omg.PortableInterceptor.USER_EXCEPTION;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import dailyReport.Constants;
import dailyReport.resource.AddressInf;
import dailyReport.resource.CampanyDetail;
import dailyReport.resource.CompanyStatus;
import dailyReport.resource.DepartmentDetail;
import dailyReport.resource.FamilyInf;
import dailyReport.resource.FixedItemInf;
import dailyReport.resource.GetUserBaseInfQuery;
import dailyReport.resource.MailInf;
import dailyReport.resource.PositionDetail;
import dailyReport.resource.QualificationInf;
import dailyReport.resource.RecordContentDetail;
import dailyReport.resource.TelInf;
import dailyReport.resource.UserInf;

/**
 * クラス名：	UserService
 * 概要：		ユーザ編集・一覧画面等のサービスロジックをまとめたクラス
 * 作成日：	2016/12/16
 * 作成者：	k.urabe
 */
@Service
@Transactional
public class UserService {

	// EntityManagerをインジェクションする
	@PersistenceContext
	EntityManager entityManager;
	@Autowired
	CommonService commonService;
	@Autowired
	PasswordEncoder passwordEncoder;
	
	/**
	 * 関数名：	searchBaseInf
	 * 概要：		ユーザ編集画面のユーザIDに紐付くユーザのBase情報を取得する
	 * 引数：		Map<String, Object> map
	 * 戻り値：	List<GetUserBaseInfQuery>
	 * 作成日：	2016/12/16
	 * 作成者：	k.urabe
	 */
	public List<GetUserBaseInfQuery> searchBaseInf(Map<String, Object> map) {
		// jsonから取得したコンテンツIDで情報を取得する
		@SuppressWarnings("unchecked")
		List<GetUserBaseInfQuery> content = entityManager
				.createNativeQuery(Constants.GET_USER_BASE_INF, "getUserBaseInfQuery")
				.setParameter(1, map.get(Constants.KEY_USER_ID).toString())
				.getResultList();
		// 取得した情報を返す
		return content;
	}
	
	/**
	 * 関数名：	searchAddInf
	 * 概要：		ユーザ編集画面のユーザIDに紐付くユーザの追加情報を取得する
	 * 引数：		Map<String, Object> map
	 * 戻り値：	
	 * 作成日：	2016/12/16
	 * 作成者：	k.urabe
	 */
	public String searchAddInf(Map<String, Object> map) {
		
		String target = "";						// 処理対象とする追加情報が何かを保持する
		List<Map<String, Object>> content = null;		// 
		
		target = (String) map.get(Constants.STR_CONTENT_TYPE);
		
		// mailか判定
		if(target.equals(Constants.STR_MAIL)) {
			// userIdに紐付くmail情報を取得する
			List<MailInf> mailInf = entityManager
					.createNamedQuery("searchUserMail", MailInf.class)
					.setParameter("user_id", map.get(Constants.KEY_USER_ID).toString())
					.getResultList();
			// Map型に変換する
			content = (List)mailInf;
		// 住所か判定
		} else if(target.equals(Constants.STR_ADDRESS)) {
			// userIdに紐付くaddress情報を取得する
			List<AddressInf> addressInf = entityManager
					.createNamedQuery("searchUserAddress", AddressInf.class)
					.setParameter("user_id", map.get(Constants.KEY_USER_ID).toString())
					.getResultList();
			// Map型に変換する
			content = (List)addressInf;
		// 電話番号か判定
		} else if(target.equals(Constants.STR_TEL)) {
			// userIdに紐付くaddress情報を取得する
			List<TelInf> telInf = entityManager
					.createNamedQuery("searchUserTel", TelInf.class)
					.setParameter("user_id", map.get(Constants.KEY_USER_ID).toString())
					.getResultList();
			// Map型に変換する
			content = (List)telInf;
		// 資格か判定
		} else if(target.equals(Constants.STR_QUALIFICATION)) {
			// userIdに紐付くqualification情報を取得する
			List<QualificationInf> qualificationInf = entityManager
					.createNamedQuery("searchUserQualification", QualificationInf.class)
					.setParameter("user_id", map.get(Constants.KEY_USER_ID).toString())
					.getResultList();
			// Map型に変換する
			content = (List)qualificationInf;
		// 家族情報か判定
		} else if(target.equals(Constants.STR_FAMILY)) {
			// userIdに紐付くfamily情報を取得する
			List<FamilyInf> familyInf = entityManager
					.createNamedQuery("searchUserFamily", FamilyInf.class)
					.setParameter("user_id", map.get(Constants.KEY_USER_ID).toString())
					.getResultList();
			// Map型に変換する
			content = (List)familyInf;
		}
		
		return commonService.convertListToJson(content);
	}
	
	/**
	 * 関数名：	saveBaseInf
	 * 概要：		
	 * 引数：		Map<String, Object> map
	 * 戻り値：	
	 * 作成日：	2016/12/16
	 * 作成者：	k.urabe
	 * @throws ParseException 
	 */
	public String saveBaseInf(Map<String, Object> map) throws ParseException {
		
		// JSONから取得した日付をentityクラスのdate型プロパティへ格納するための日付変換インスタンスを生成する
		SimpleDateFormat sdf = new SimpleDateFormat(Constants.DATE_FORMAT);
		
		// 親のユーザ情報登録用のインスタンスを取得する
		UserInf parentContent = new UserInf();
		// ユーザ情報テーブルに各値をセットしていく
		// ユーザIDをセットする
		parentContent.setUserId(map.get(Constants.KEY_USER_ID).toString());
		// パスワードをセットする
		parentContent.setLoginPassword(passwordEncoder.encode(map.get(Constants.KEY_LOGIN_PASSWORD).toString()));
		// ユーザ名をセットする
		parentContent.setUserName(map.get(Constants.KEY_USER_NAME).toString());
		// ユーザ名（カナ）をセットする
		parentContent.setUserNameKana(map.get(Constants.KEY_USER_NAME_KANA).toString());
		// 性別をセットする
		parentContent.setUserSex(new Integer(map.get(Constants.KEY_USER_SEX).toString()));
		// 誕生日をセットする
		parentContent.setUserBirthday(sdf.parse((String)map.get(Constants.KEY_USER_BIRTHDAY)));
		// 権限をセットする
		parentContent.setUserAuthority(Constants.FLAG_USER_AUTH_USER);
		// 登録状態をセットする
		parentContent.setUserStatus(new Integer(map.get(Constants.KEY_USER_STATUS).toString()));
		// 作成日をセットする
		parentContent.setCreateDate(new Date());
		// 更新日をセットする
		parentContent.setUpdateDated(new Date());
		
		// entityを管理状態にする
		entityManager.persist(parentContent);
		
		// 所属情報登録用のインスタンスを取得する
		CompanyStatus content = new CompanyStatus();
		// ユーザIDをセットする
		content.setUserId(map.get(Constants.KEY_USER_ID).toString());
		// 会社IDをセットする
		content.setCampanyId(new Integer(map.get(Constants.KEY_CAMPANY_ID).toString()));
		// 部署IDをセットする
		content.setDepartmentId(new Integer(map.get(Constants.KEY_DEPARTMENT_ID).toString()));
		// 役職IDをセットする
		content.setPositionId(new Integer(map.get(Constants.KEY_POSITION_ID).toString()));
		
		// entityを管理状態にする
		entityManager.persist(content);
		
		return Constants.STR_SUCCESS;
	}
	
	/**
	 * 関数名：	updateBaseInf
	 * 概要：		
	 * 引数：		Map<String, Object> map
	 * 戻り値：	
	 * 作成日：	2016/12/16
	 * 作成者：	k.urabe
	 * @throws ParseException 
	 */
	public String updateBaseInf(Map<String, Object> map) throws ParseException {
		
		// JSONから取得した日付をentityクラスのdate型プロパティへ格納するための日付変換インスタンスを生成する
		SimpleDateFormat sdf = new SimpleDateFormat(Constants.DATE_FORMAT);
				
		// 親のUserIdに紐付く情報を取得する
		UserInf parentContent = entityManager.find(UserInf.class, map.get(Constants.KEY_USER_ID).toString());
		// ユーザ情報テーブルに各値をセットしていく
		// ユーザIDをセットする
		parentContent.setUserId(map.get(Constants.KEY_USER_ID).toString());
		// パスワードに入力があれば
		if(map.get(Constants.KEY_LOGIN_PASSWORD).toString() != "") {
			// パスワードをセットする
			parentContent.setLoginPassword(passwordEncoder.encode(map.get(Constants.KEY_LOGIN_PASSWORD).toString()));
		}
		// ユーザ名をセットする
		parentContent.setUserName(map.get(Constants.KEY_USER_NAME).toString());
		// ユーザ名（カナ）をセットする
		parentContent.setUserNameKana(map.get(Constants.KEY_USER_NAME_KANA).toString());
		// 性別をセットする
		parentContent.setUserSex(new Integer(map.get(Constants.KEY_USER_SEX).toString()));
		// 誕生日をセットする
		parentContent.setUserBirthday(sdf.parse((String)map.get(Constants.KEY_USER_BIRTHDAY)));
		// 登録状態をセットする
		parentContent.setUserStatus(new Integer(map.get(Constants.KEY_USER_STATUS).toString()));
		// 更新日をセットする
		parentContent.setUpdateDated(new Date());
		
		// entityを管理状態にする
		entityManager.persist(parentContent);

		// userIdに紐付く会社ステータスを取得する
		CompanyStatus content = entityManager
			.createNamedQuery("searchUserCompanyStatus", CompanyStatus.class)
			.setParameter("user_id", map.get(Constants.KEY_USER_ID).toString())
			.getSingleResult();
		// 会社IDをセットする
		content.setCampanyId(new Integer(map.get(Constants.KEY_CAMPANY_ID).toString()));
		// 部署IDをセットする
		content.setDepartmentId(new Integer(map.get(Constants.KEY_DEPARTMENT_ID).toString()));
		// 役職IDをセットする
		content.setPositionId(new Integer(map.get(Constants.KEY_POSITION_ID).toString()));
		
		// entityを管理状態にする
		entityManager.persist(content);
		
		return Constants.STR_SUCCESS;
	}
	
	/**
	 * 関数名：	saveAddInf
	 * 概要：		
	 * 引数：		Map<String, Object> map
	 * 戻り値：	
	 * 作成日：	2016/12/16
	 * 作成者：	k.urabe
	 */
	public String saveAddInf(Map<String, Object> map) {
		
		String target = "";						// 処理対象とする追加情報が何かを保持する
		String tmp;								// 一時的にキー名を保持する変数
		
		target = (String) map.get(Constants.STR_CONTENT_TYPE);
		
		// mailか判定
		if(target.equals(Constants.STR_MAIL)) {
			// userIdに紐付く情報を削除する
			entityManager
				.createNamedQuery("deleteUserMail")
				.setParameter("user_id", map.get(Constants.KEY_USER_ID).toString())
				.executeUpdate();
			
			// メール情報のインスタンスを取得する
			MailInf content = new MailInf();
			// 対象のmapを走査して、値がオブジェクトのものを探す
			for(Map.Entry<String, Object> obj : map.entrySet()) {	
				// 値がobjectか判定する
				if(obj.getValue() instanceof Map<?, ?>) {
					// 子要素の中を走査する
					for(Map.Entry<String, Object> childmap : ((Map<String, Object>) obj.getValue()).entrySet()) {
						// 現在のキー名を取得する
						tmp = childmap.getKey();
						// キー名がuser_idであれば
						if(tmp.equals(Constants.KEY_USER_ID.toString())) {
							// user_idに値をセットする
							content.setUserId(childmap.getValue().toString());
						// キー名がmail_titleであれば
						} else if(tmp.equals(Constants.KEY_MAIL_TITLE.toString())) {
							// mail_titleをセットする
							content.setMailTitle(childmap.getValue().toString());
						// キー名がmailであれば
						} else if(tmp.equals(Constants.KEY_MAIL.toString())) {
							// mailをセットする
							content.setMail(childmap.getValue().toString());
						}
					}
					// （子）クエリを実行する
					entityManager.persist(content);
					// （子）次レコード用の新規entityインスタンスを作成する。
					content = new MailInf();
				}
			}
		// 住所か判定
		} else if(target.equals(Constants.STR_ADDRESS)) {
			// userIdに紐付く情報を削除する
			entityManager
				.createNamedQuery("deleteUserAddress")
				.setParameter("user_id", map.get(Constants.KEY_USER_ID).toString())
				.executeUpdate();
			// address情報のインスタンスを取得する
			AddressInf content = new AddressInf();
			// 対象のmapを走査して、値がオブジェクトのものを探す
			for(Map.Entry<String, Object> obj : map.entrySet()) {	
				// 値がobjectか判定する
				if(obj.getValue() instanceof Map<?, ?>) {
					// 子要素の中を走査する
					for(Map.Entry<String, Object> childmap : ((Map<String, Object>) obj.getValue()).entrySet()) {
						// 現在のキー名を取得する
						tmp = childmap.getKey();
						// キー名がuser_idであれば
						if(tmp.equals(Constants.KEY_USER_ID.toString())) {
							// user_idに値をセットする
							content.setUserId(childmap.getValue().toString());
						// キー名がaddress_titleであれば
						} else if(tmp.equals(Constants.KEY_ADDRESS_TITLE.toString())) {
							// address_titleをセットする
							content.setAddressTitle(childmap.getValue().toString());
						// キー名がpost_numberであれば
						} else if(tmp.equals(Constants.KEY_POST_NUMBER.toString())) {
							// post_numberをセットする
							content.setPostNumber(childmap.getValue().toString());
						// キー名がaddressであれば
						} else if(tmp.equals(Constants.KEY_ADDRESS.toString())) {
							// addressをセットする
							content.setAddress(childmap.getValue().toString());
						}
					}
					// （子）クエリを実行する
					entityManager.persist(content);
					// （子）次レコード用の新規entityインスタンスを作成する。
					content = new AddressInf();
				}
			}
		// 電話番号か判定
		} else if(target.equals(Constants.STR_TEL)) {
			// userIdに紐付く情報を削除する
			entityManager
				.createNamedQuery("deleteUserTel")
				.setParameter("user_id", map.get(Constants.KEY_USER_ID).toString())
				.executeUpdate();
			// tel情報のインスタンスを取得する
			TelInf content = new TelInf();
			// 対象のmapを走査して、値がオブジェクトのものを探す
			for(Map.Entry<String, Object> obj : map.entrySet()) {	
				// 値がobjectか判定する
				if(obj.getValue() instanceof Map<?, ?>) {
					// 子要素の中を走査する
					for(Map.Entry<String, Object> childmap : ((Map<String, Object>) obj.getValue()).entrySet()) {
						// 現在のキー名を取得する
						tmp = childmap.getKey();
						// キー名がuser_idであれば
						if(tmp.equals(Constants.KEY_USER_ID.toString())) {
							// user_idに値をセットする
							content.setUserId(childmap.getValue().toString());
						// キー名がtel_titleであれば
						} else if(tmp.equals(Constants.KEY_TEL_TITLE.toString())) {
							// tel_titleをセットする
							content.setTelTitle(childmap.getValue().toString());
						// キー名がtelであれば
						} else if(tmp.equals(Constants.KEY_TEL.toString())) {
							// telをセットする
							content.setTel(childmap.getValue().toString());
						}
					}
					// （子）クエリを実行する
					entityManager.persist(content);
					// （子）次レコード用の新規entityインスタンスを作成する。
					content = new TelInf();
				}
			}
		// 資格か判定
		} else if(target.equals(Constants.STR_QUALIFICATION)) {
			// userIdに紐付く情報を削除する
			entityManager
				.createNamedQuery("deleteUserQualification")
				.setParameter("user_id", map.get(Constants.KEY_USER_ID).toString())
				.executeUpdate();
			// 資格情報のインスタンスを取得する
			QualificationInf content = new QualificationInf();
			// 対象のmapを走査して、値がオブジェクトのものを探す
			for(Map.Entry<String, Object> obj : map.entrySet()) {	
				// 値がobjectか判定する
				if(obj.getValue() instanceof Map<?, ?>) {
					// 子要素の中を走査する
					for(Map.Entry<String, Object> childmap : ((Map<String, Object>) obj.getValue()).entrySet()) {
						// 現在のキー名を取得する
						tmp = childmap.getKey();
						// キー名がuser_idであれば
						if(tmp.equals(Constants.KEY_USER_ID.toString())) {
							// user_idに値をセットする
							content.setUserId(childmap.getValue().toString());
						// キー名がqualification_idであれば
						} else if(tmp.equals(Constants.KEY_QUALIFICATION_ID.toString())) {
							// qualification_idをセットする
							content.setQualificationId(new Integer(childmap.getValue().toString()));
						}
					}
					// （子）クエリを実行する
					entityManager.persist(content);
					// （子）次レコード用の新規entityインスタンスを作成する。
					content = new QualificationInf();
				}
			}
		// 家族情報か判定
		} else if(target.equals(Constants.STR_FAMILY)) {
			// userIdに紐付く情報を削除する
			entityManager
				.createNamedQuery("deleteUserFamily")
				.setParameter("user_id", map.get(Constants.KEY_USER_ID).toString())
				.executeUpdate();

			// family情報のインスタンスを取得する
			FamilyInf content = new FamilyInf();
			// 対象のmapを走査して、値がオブジェクトのものを探す
			for(Map.Entry<String, Object> obj : map.entrySet()) {	
				// 値がobjectか判定する
				if(obj.getValue() instanceof Map<?, ?>) {
					// 子要素の中を走査する
					for(Map.Entry<String, Object> childmap : ((Map<String, Object>) obj.getValue()).entrySet()) {
						// 現在のキー名を取得する
						tmp = childmap.getKey();
						// キー名がuser_idであれば
						if(tmp.equals(Constants.KEY_USER_ID.toString())) {
							// user_idに値をセットする
							content.setUserId(childmap.getValue().toString());
						// キー名がfamily_nameであれば
						} else if(tmp.equals(Constants.KEY_FAMILY_NAME.toString())) {
							// family_nameをセットする
							content.setFamilyName(childmap.getValue().toString());
						// キー名がfamily_name_kanaであれば
						} else if(tmp.equals(Constants.KEY_FAMILY_NAME_KANA.toString())) {
							// family_name_kanaをセットする
							content.setFamilyNameKana(childmap.getValue().toString());
						// キー名がfamily_relationであれば
						} else if(tmp.equals(Constants.KEY_FAMILY_RELATION.toString())) {
							// family_relationをセットする
							content.setFamilyRelation(childmap.getValue().toString());
						// キー名がfamily_supportであれば
						} else if(tmp.equals(Constants.KEY_FAMILY_SUPPORT.toString())) {
							// qualification_idをセットする
							content.setFamilySupport(new Integer(childmap.getValue().toString()));
						}
					}
					// （子）クエリを実行する
					entityManager.persist(content);
					// （子）次レコード用の新規entityインスタンスを作成する。
					content = new FamilyInf();
				}
			}
		}
		
		
		return Constants.STR_SUCCESS;
	}
	
	/**
	 * 関数名：	deleteBaseInf
	 * 概要：		
	 * 引数：		Map<String, Object> map
	 * 戻り値：	
	 * 作成日：	2016/12/16
	 * 作成者：	k.urabe
	 */
	public String deleteBaseInf(Map<String, Object> map) {
		// 親のUserIdに紐付く情報を取得する
		UserInf parentContent = entityManager.find(UserInf.class, map.get(Constants.KEY_USER_ID).toString());
		// ユーザ情報テーブルに各値をセットしていく
		// 登録状態をセットする
		parentContent.setUserStatus((int)map.get(Constants.KEY_USER_STATUS));
		// 更新日をセットする
		parentContent.setUpdateDated(new Date());
		
		// entityを管理状態にする
		entityManager.persist(parentContent);		
		return Constants.STR_SUCCESS;
	}
	
	/**
	 * 関数名：	macthBaseInf
	 * 概要：		
	 * 引数：		Map<String, Object> map
	 * 戻り値：	
	 * 作成日：	2016/12/16
	 * 作成者：	k.urabe
	 */
	public List<GetUserBaseInfQuery> macthBaseInf(Map<String, Object> map) {
		
		String query = Constants.GET_USER_SEARCH_INF;		// 検索用クエリの固定部分をセットする
		
		// JSONから取得した日付をentityクラスのdate型プロパティへ格納するための日付変換インスタンスを生成する
		SimpleDateFormat sdf = new SimpleDateFormat(Constants.DATE_FORMAT);
		
		// 本日日付を所定フォーマットで取得する
		Calendar today = sdf.getCalendar();
		
		// 年齢のmin値がセットされている
		if(map.get(Constants.MIN) != "") {
			int min = new Integer(map.get(Constants.MIN).toString());
			// 現在日付より入力値を差し引く
			today.add(Calendar.YEAR, -min);
			// 検索条件を追加する
			query += Constants.STR_MIN_DATE + Constants.STR_SINGLE + today.toString() + Constants.STR_SINGLE;
		}
		
		// 年齢のmin値がセットされている
		if(map.get(Constants.MAX) != "") {
			int max = new Integer(map.get(Constants.MIN).toString());
			// 現在日付より入力値を差し引く
			today.add(Calendar.YEAR, -max);
			// 検索条件を追加する
			query += Constants.STR_MAX_DATE + Constants.STR_SINGLE + today.toString() + Constants.STR_SINGLE;
		}
		
		// jsonから取得したコンテンツIDで情報を取得する
		@SuppressWarnings("unchecked")
		List<GetUserBaseInfQuery> content = entityManager
				.createNativeQuery(query, "getUserBaseInfQuery")
				.setParameter(1, "%" + map.get(Constants.KEY_USER_ID).toString() + "%")
				.setParameter(2, "%" + map.get(Constants.KEY_USER_NAME).toString() + "%")
				.setParameter(3, "%" + map.get(Constants.KEY_USER_SEX).toString() + "%")
				.getResultList();
		// 取得した情報を返す
		return content;
	}
	
	/**
	 * 関数名：	searchCompanyList
	 * 概要：		
	 * 引数：		なし
	 * 戻り値：	
	 * 作成日：	2016/12/16
	 * 作成者：	k.urabe
	 */
	public List<CampanyDetail> searchCompanyList() {
		
		// 役職情報の一覧を取得する
		List<CampanyDetail> content =
				entityManager
				.createNamedQuery("campanyDetailAll", CampanyDetail.class)
				.getResultList();
		
		return content;
	}
	
	/**
	 * 関数名：	searchDepartmentList
	 * 概要：		
	 * 引数：		なし
	 * 戻り値：	
	 * 作成日：	2016/12/16
	 * 作成者：	k.urabe
	 */
	public List<DepartmentDetail> searchDepartmentList() {
		
		// 役職情報の一覧を取得する
		List<DepartmentDetail> content =
				entityManager
				.createNamedQuery("departmentDetailAll", DepartmentDetail.class)
				.getResultList();
		
		return content;
	}
	
	/**
	 * 関数名：	searchPositionList
	 * 概要：		
	 * 引数：		なし
	 * 戻り値：	
	 * 作成日：	2016/12/16
	 * 作成者：	k.urabe
	 */
	public List<PositionDetail> searchPositionList() {
		
		// 役職情報の一覧を取得する
		List<PositionDetail> content =
				entityManager
				.createNamedQuery("positionDetailAll", PositionDetail.class)
				.getResultList();
		
		return content;
	}
	
	
}
