package dailyReport.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dailyReport.resource.RecordContentDetail;
import dailyReport.resource.RecordContentInf;

@Service
@Transactional
public class TopService {

	// entityクラスをインジェクションする
	@Autowired
	RecordContentInf recordContentInf;
	@Autowired
	RecordContentDetail recordContentDetail;
	
	// TODO:【未実装】entityクラスはこれでよいか未検証。今はダミーとしてテーブル単体のものを指定している。
	public RecordContentInf searchTopPageContent(Map<String, Object> map) {
		
		
		return recordContentInf;
		
	}
	
	// TODO:【未実装】entityクラスはこれでよいか未検証。今はダミーとしてテーブル単体のものを指定している。
	public RecordContentDetail searchTopPageDetailContent(Map<String, Object> map) {
		
		
		return recordContentDetail;
		
	}
	
	
	public boolean logcalDeleteContent(Map<String, Object> map) {
		
		
		return false;
		
	}
	
	public boolean physicalDeleteContent(Map<String, Object> map) {
		
		
		return false;
		
	}
	
	
}
