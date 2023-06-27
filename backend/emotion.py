from transformers import BertForSequenceClassification
import torch
from transformers import BertModel, BertTokenizer
from sklearn.preprocessing import LabelEncoder
import pandas as pd

# KoBERT 모델 로드
model = BertModel.from_pretrained('ji-soo/my_model6-kobert')

# KoBERT 토크나이저 로드
tokenizer = BertTokenizer.from_pretrained('ji-soo/my_model6-kobert')

def preprocess(text):
    # 전처리 생략
    return text

def load_model_and_analyze_sentiment(text):
    # 텍스트 입력 받아 전처리 수행
    preprocessed_text = preprocess(text)

    # 모델 로드
    model = BertForSequenceClassification.from_pretrained('ji-soo/my_model6-kobert')
    tokenizer = BertTokenizer.from_pretrained('ji-soo/my_model6-kobert')
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model.to(device)
    model.eval()

    # 입력 텍스트 텐서로 변환
    inputs = tokenizer.encode_plus(
        preprocessed_text,
        add_special_tokens=True,
        return_tensors='pt',
        padding='max_length',
        truncation=True,
        max_length=128
    )
    inputs = {k: v.to(device) for k, v in inputs.items()}

    # 레이블 인코더를 사용해 감정 레이블 변환
    label_encoder = LabelEncoder()
    label_encoder.fit(['공포', '놀람', '분노', '슬픔', '중립', '행복', '혐오'])

    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        predicted_label = torch.argmax(logits).item()

    # 예측 결과를 원래 감정 레이블로 변환 (label_encoder.inverse_transform() 사용)
    predicted_emotion = label_encoder.inverse_transform([predicted_label])[0]

    # 반환값 '혐오' 인 경우 '고민'으로 변경
    if predicted_emotion == '혐오':
        predicted_emotion = '고민'

    # 결과 반환
    return predicted_emotion