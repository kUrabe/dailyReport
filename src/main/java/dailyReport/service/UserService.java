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

import dailyReport.Constants;
import dailyReport.resource.AddressInf;
import dailyReport.resource.CampanyDetail;
import dailyReport.resource.CompanyStatus;
import dailyReport.resource.DepartmentDetail;
import dailyReport.resource.FamilyInf;
import dailyReport.resource.GetUserBaseInfQuery;
import dailyReport.resource.MailInf;
import dailyReport.resource.PositionDetail;
import dailyReport.resource.QualificationInf;
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
		Map<String, Object> content = null;		// 
		
		target = (String) map.get(Constants.STR_CONTENT_TYPE);
		
		// mailか判定
		if(target.equals(Constants.STR_MAIL)) {
			// userIdに紐付くmail情報を取得する
			List<MailInf> mailInf = entityManager
					.createNamedQuery("searchUserMail", MailInf.class)
					.setParameter("user_id", map.get(Constants.KEY_USER_ID).toString())
					.getResultList();
			// Map型に変換する
			content = (Map<String, Object>)mailInf;
		// 住所か判定
		} else if(target.equals(Constants.STR_ADDRESS)) {
			// userIdに紐付くaddress情報を取得する
			List<AddressInf> addressInf = entityManager
					.createNamedQuery("searchUserAddress", AddressInf.class)
					.setParameter("user_id", map.get(Constants.KEY_USER_ID).toString())
					.getResultList();
			// Map型に変換する
			content = (Map<String, Object>)addressInf;
		// 電話番号か判定
		} else if(target.equals(Constants.STR_TEL)) {
			// userIdに紐付くaddress情報を取得する
			List<TelInf> telInf = entityManager
					.createNamedQuery("searchUserTel", TelInf.class)
					.setParameter("user_id", map.get(Constants.KEY_USER_ID).toString())
					.getResultList();
			// Map型に変換する
			content = (Map<String, Object>)telInf;
		// 資格か判定
		} else if(target.equals(Constants.STR_QUALIFICATION)) {
			// userIdに紐付くqualification情報を取得する
			List<QualificationInf> qualificationInf = entityManager
					.createNamedQuery("searchUserQualification", QualificationInf.class)
					.setParameter("user_id", map.get(Constants.KEY_USER_ID).toString())
					.getResultList();
			// Map型に変換する
			content = (Map<String, Object>)qualificationInf;
		// 家族情報か判定
		} else if(target.equals(Constants.STR_FAMILY)) {
			// userIdに紐付くfamily情報を取得する
			List<FamilyInf> familyInf = entityManager
					.createNamedQuery("searchUserFamily", FamilyInf.class)
					.setParameter("user_id", map.get(Constants.KEY_USER_ID).toString())
					.getResultList();
			// Map型に変換する
			content = (Map<String, Object>)familyInf;
		}
		
		return commonService.convertMapToJson(content);
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
		parentContent.setLoginPassword(map.get(Constants.KEY_LOGIN_PASSWORD).toString());
		// ユーザ名をセットする
		parentContent.setUserName(map.get(Constants.KEY_USER_NAME).toString());
		// ユーザ名（カナ）をセットする
		parentContent.setUserNameKana(map.get(Constants.KEY_USER_NAME_KANA).toString());
		// 性別をセットする
		parentContent.setUserSex((int)map.get(Constants.KEY_USER_SEX));
		// 誕生日をセットする
		parentContent.setUserBirthday(sdf.parse((String)map.get(Constants.KEY_USER_BIRTHDAY)));
		// 権限をセットする
		parentContent.setUserAuthority(1);
		// 登録状態をセットする
		parentContent.setUserStatus(4);
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
		content.setCampanyId((int)map.get(Constants.KEY_CAMPANY_ID));
		// 部署IDをセットする
		content.setDepartmentId((int)map.get(Constants.KEY_DEPARTMENT_ID));
		// 役職IDをセットする
		content.setPositionId((int)map.get(Constants.KEY_POSITION_ID));
		
		// entityを管理状態にする
		entityManager.persist(content);
		
		return "";
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
			parentContent.setLoginPassword(map.get(Constants.KEY_LOGIN_PASSWORD).toString());
		}
		// ユーザ名をセットする
		parentContent.setUserName(map.get(Constants.KEY_USER_NAME).toString());
		// ユーザ名（カナ）をセットする
		parentContent.setUserNameKana(map.get(Constants.KEY_USER_NAME_KANA).toString());
		// 性別をセットする
		parentContent.setUserSex((int)map.get(Constants.KEY_USER_SEX));
		// 誕生日をセットする
		parentContent.setUserBirthday(sdf.parse((String)map.get(Constants.KEY_USER_BIRTHDAY)));
		// 権限をセットする
		parentContent.setUserAuthority((int)map.get(Constants.KEY_USER_AUTHORITY));
		// 登録状態をセットする
		parentContent.setUserStatus((int)map.get(Constants.KEY_USER_STATUS));
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
		content.setCampanyId((int)map.get(Constants.KEY_CAMPANY_ID));
		// 部署IDをセットする
		content.setDepartmentId((int)map.get(Constants.KEY_DEPARTMENT_ID));
		// 役職IDをセットする
		content.setPositionId((int)map.get(Constants.KEY_POSITION_ID));
		
		// entityを管理状態にする
		entityManager.persist(content);
		
		return "";
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
		Map<String, Object> content = null;		// 
		
		target = (String) map.get(Constants.STR_CONTENT_TYPE);
		
		// mailか判定
		if(target.equals(Constants.STR_MAIL)) {
			// userIdに紐付く情報を削除する
			entityManager
				.createNamedQuery("deleteUserMail", MailInf.class)
				.setParameter("user_id", map.get(Constants.KEY_USER_ID).toString())
				.executeUpdate();
			// userIdに紐付くmail情報を取得する
			List<MailInf> mailInf = entityManager
					.createNamedQuery("searchUserMail", MailInf.class)
					.setParameter("user_id", map.get(Constants.KEY_USER_ID).toString())
					.getResultList();
			// Map型に変換する
			content = (Map<String, Object>)mailInf;
		// 住所か判定
		} else if(target.equals(Constants.STR_ADDRESS)) {
			// userIdに紐付く情報を削除する
			entityManager
				.createNamedQuery("deleteUserAddress", AddressInf.class)
				.setParameter("user_id", map.get(Constants.KEY_USER_ID).toString())
				.executeUpdate();
			// userIdに紐付くaddress情報を取得する
			List<AddressInf> addressInf = entityManager
					.createNamedQuery("searchUserAddress", AddressInf.class)
					.setParameter("user_id", map.get(Constants.KEY_USER_ID).toString())
					.getResultList();
			// Map型に変換する
			content = (Map<String, Object>)addressInf;
		// 電話番号か判定
		} else if(target.equals(Constants.STR_TEL)) {
			// userIdに紐付く情報を削除する
			entityManager
				.createNamedQuery("deleteUserTel", TelInf.class)
				.setParameter("user_id", map.get(Constants.KEY_USER_ID).toString())
				.executeUpdate();
			// userIdに紐付くaddress情報を取得する
			List<TelInf> telInf = entityManager
					.createNamedQuery("searchUserTel", TelInf.class)
					.setParameter("user_id", map.get(Constants.KEY_USER_ID).toString())
					.getResultList();
			// Map型に変換する
			content = (Map<String, Object>)telInf;
		// 資格か判定
		} else if(target.equals(Constants.STR_QUALIFICATION)) {
			// userIdに紐付く情報を削除する
			entityManager
				.createNamedQuery("deleteUserQualification", QualificationInf.class)
				.setParameter("user_id", map.get(Constants.KEY_USER_ID).toString())
				.executeUpdate();
			// userIdに紐付くqualification情報を取得する
			List<QualificationInf> qualificationInf = entityManager
					.createNamedQuery("searchUserQualification", QualificationInf.class)
					.setParameter("user_id", map.get(Constants.KEY_USER_ID).toString())
					.getResultList();
			// Map型に変換する
			content = (Map<String, Object>)qualificationInf;
		// 家族情報か判定
		} else if(target.equals(Constants.STR_FAMILY)) {
			// userIdに紐付く情報を削除する
			entityManager
				.createNamedQuery("deleteUserFamily", FamilyInf.class)
				.setParameter("user_id", map.get(Constants.KEY_USER_ID).toString())
				.executeUpdate();

			// userIdに紐付くfamily情報を取得する
			List<FamilyInf> familyInf = entityManager
					.createNamedQuery("searchUserFamily", FamilyInf.class)
					.setParameter("user_id", map.get(Constants.KEY_USER_ID).toString())
					.getResultList();
			// Map型に変換する
			content = (Map<String, Object>)familyInf;
		}
		
		
		return "";
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
		return "";
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
