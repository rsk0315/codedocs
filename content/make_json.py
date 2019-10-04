import glob
import json

def main():
    files = {}

    for f in sorted(glob.glob('*/*.md')):
        dirname, basename = f.split('/')
        root, ext = basename.rsplit('.')
        if dirname not in files:
            files[dirname] = []

        with open(f) as fin:
            title = fin.readline().lstrip('% ').rstrip()

        files[dirname].append({root: title})

    for dirname in files:
        files[dirname].sort(key=lambda x: list(x.keys())[0])

    with open('index.json', 'w') as fout:
        json.dump(files, fout, indent=4)

if __name__ == '__main__':
    main()
