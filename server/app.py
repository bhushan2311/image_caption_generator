from flask import Flask, request, jsonify

app = Flask(__name__)

# @app.route('/', methods=['POST'])
# def generate_caption():
#     # Code to generate captions here
#     return jsonify({'caption': 'Generated caption'})

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)