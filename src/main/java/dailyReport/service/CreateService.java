package dailyReport.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dailyReport.resource.RecordContentDetail;

@Service
@Transactional
public class CreateService {
	
	@Autowired
	RecordContentDetail recordContentDetail;
	
	// TODO:【未実装】entityクラスはこれでよいか未検証。今はダミーとしてテーブル単体のものを指定している。
	public RecordContentDetail getContentByDay(Map<String, Object> map) {
		
		
		return recordContentDetail;
		
	}
	
	public boolean createContent(Map<String, Object> json) {
		
		return false;
	}
	
	// TODO:【未実装】entityクラスはこれでよいか未検証。今はダミーとしてテーブル単体のものを指定している。
	public RecordContentDetail getBeforeContent(Map<String, Object> map) {
		
		
		return recordContentDetail;
		
	}
	
	public boolean createTemplate(Map<String, Object> json) {
		
		return false;
	}
	
	public boolean updateContent(Map<String, Object> json) {
		
		return false;
	}
	
	public boolean updateTemplate(Map<String, Object> json) {
		
		return false;
	}
	
}
