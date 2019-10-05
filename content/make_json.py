import configparser
import glob
import json
import os.path

def make_json():
    index = {}

    for f in sorted(glob.glob('*/*.md')):
        dirname, basename = f.split('/')
        root, ext = basename.rsplit('.')
        if dirname not in index:
            index[dirname] = {'contents': []}

        with open(f) as fin:
            title = fin.readline().lstrip('% ').rstrip()

        index[dirname]['contents'].append({'id': root, 'title': title})

    for dirname in index:
        index[dirname]['contents'].sort(key=lambda x: x['id'])

        index_file = f'{dirname}/.config'
        if not os.path.isfile(index_file):
            index[dirname]['title'] = dirname
            continue

        cfp = configparser.ConfigParser()
        cfp.read(index_file)
        index[dirname]['title'] = cfp['INDEX']['title']

    print(json.dumps(index, indent=4))
    # with open('index.json', 'w') as fout:
    #     json.dump(index, fout, indent=4)

def main():
    make_json()

if __name__ == '__main__':
    main()
