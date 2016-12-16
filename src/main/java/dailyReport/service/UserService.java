package dailyReport.service;

import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dailyReport.Constants;
import dailyReport.resource.AddressInf;
import dailyReport.resource.CampanyDetail;
import dailyReport.resource.DepartmentDetail;
import dailyReport.resource.FamilyInf;
import dailyReport.resource.GetUserBaseInfQuery;
import dailyReport.resource.MailInf;
import dailyReport.resource.PositionDetail;
import dailyReport.resource.QualificationInf;
import dailyReport.resource.TelInf;

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
			List<FamilyInf> qualificationInf = entityManager
					.createNamedQuery("searchUserFamily", FamilyInf.class)
					.setParameter("user_id", map.get(Constants.KEY_USER_ID).toString())
					.getResultList();
			// Map型に変換する
			content = (Map<String, Object>)qualificationInf;
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
	 */
	public String saveBaseInf(Map<String, Object> map) {
		
		
		
		return "";
	}
	
	/**
	 * 関数名：	updateBaseInf
	 * 概要：		
	 * 引数：		Map<String, Object> map
	 * 戻り値：	
	 * 作成日：	2016/12/16
	 * 作成者：	k.urabe
	 */
	public String updateBaseInf(Map<String, Object> map) {
		
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
	public String macthBaseInf(Map<String, Object> map) {
		
		return "";
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
