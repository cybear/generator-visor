var Generator = require('yeoman-generator');

function normalizeFilename(name) {
  return name.toLowerCase().replace(/ /g, '-');
}

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
    // Next, add your custom code
    //this.option('babel'); // This method adds support for a `--babel` flag
  }

  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Song name'
      },
      {
        type: 'input',
        name: 'authors',
        message: 'Author(s)'
      },
      {
        type: 'input',
        name: 'youtube_id',
        message: 'YouTube ID'
      },
      {
        type: 'input',
        name: 'spotify_id',
        message: 'Spotify ID'
      }
    ]).then(props => this.props = props);
  }
  writing() {
    const authors = this.props.authors.split(',');
    authors
    .map(author => author.trim())
      .map(author =>
        this.fs.copyTpl(
          this.templatePath('author.md'),
          this.destinationPath(`_my_categories/${normalizeFilename(author)}.md`),
          {author: author}
        )
    );

    const date = new Date().toISOString().split('T')[0];
    const destPath = `_posts/${date}-${normalizeFilename(this.props.title)}.md`;
    this.fs.copyTpl(
      this.templatePath('song.md'),
      this.destinationPath(destPath),
      this.props
    )
  }
};
