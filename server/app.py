from flask import Flask, request, jsonify
# from flask import Flask, render_template,request
import cv2
from keras.models import load_model
import numpy as np
from keras.applications import ResNet50
from keras.optimizers import Adam
from keras.layers import Dense, Flatten,Input, Convolution2D, Dropout, LSTM, TimeDistributed, Embedding, Bidirectional, Activation, RepeatVector,Concatenate
from keras.models import Sequential, Model
from keras.utils import np_utils
from keras.preprocessing import image, sequence
import cv2
from keras_preprocessing.sequence import pad_sequences
from tqdm import tqdm
# from keras.applications.Resnet50 import preprocess_input
from flask_cors import CORS

from keras.applications import ResNet50
resnet = ResNet50(include_top=False, weights='imagenet',input_shape=(224,224,3), pooling='avg')

print("="*50)
print("resnet loaded")

# resnet = load_model('resnet.h5')

vocab = np.load('vocab.npy', allow_pickle=True)               
# vocab = np.load('vocab1.npy', allow_pickle=True)        #---------------- Changes

vocab = vocab.item()

inv_vocab = {v:k for k,v in vocab.items()}

embedding_size = 128
max_len = 40                      
# max_len = 36                            #---------------- Changes
vocab_size = len(vocab)

image_model = Sequential()

image_model.add(Dense(embedding_size, input_shape=(2048,), activation='relu'))
image_model.add(RepeatVector(max_len))


language_model = Sequential()

language_model.add(Embedding(input_dim=vocab_size, output_dim=embedding_size, input_length=max_len))
language_model.add(LSTM(256, return_sequences=True))
language_model.add(TimeDistributed(Dense(embedding_size)))


conca = Concatenate()([image_model.output, language_model.output])
x = LSTM(128, return_sequences=True)(conca)
x = LSTM(512, return_sequences=False)(x)
x = Dense(vocab_size)(x)
out = Activation('softmax')(x)
model = Model(inputs=[image_model.input, language_model.input], outputs = out)

# model.load_weights("../input/model_weights.h5")
model.compile(loss='categorical_crossentropy', optimizer='RMSprop', metrics=['accuracy'])

model.load_weights('mine_model_weights.h5')
# model.load_weights('model_weights.h5')                     #---------------- Changes

print("="*50)
print("model loaded")

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 1
cors = CORS(app, resources={r"/*": {"origins": "*"}})
# @app.route('/')
# def index(): 
#     return render_template('index.html')

@app.route('/after', methods=['POST'])
def after():
    global model,vocab,inv_vocab 
    file = request.files['file']

    file.save('static/file.jpg')
    img = cv2.imread('static/file.jpg')
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = cv2.resize(img,(224,224,))                    # diff
    img = np.reshape(img,(1,224,224,3))

    # img = image.load_img(file, target_size=(224, 224))
    # x = image.img_to_array(img)
    # x = np.expand_dims(x, axis=0)
    # x = preprocess_input(x)   # ----- doubt

    features = resnet.predict(img).reshape(1,2048)

    print("="*50)
    print("Predict Features")


    text_in = ['startofseq']

    final = ''

    print("="*50)
    print("GETING Captions")

    count = 0
    while tqdm(count < 20):

        count += 1

        encoded = []
        for i in text_in:
            encoded.append(vocab[i])

        padded = pad_sequences([encoded], maxlen=max_len, padding='post', truncating='post').reshape(1,max_len)

        sampled_index = np.argmax(model.predict([features, padded]))

        sampled_word = inv_vocab[sampled_index]

        if sampled_word != 'endofseq':
            final = final + ' ' + sampled_word

        text_in.append(sampled_word)


    return jsonify({'caption': final})


if __name__ == "__main__":
    app.run(debug=True) 