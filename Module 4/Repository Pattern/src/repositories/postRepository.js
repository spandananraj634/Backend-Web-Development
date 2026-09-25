// src/repositories/postRepository.js — Map-backed version
const postStore = require('../data/postStore');

function findAll() {
  return [...postStore.posts.values()];
}

function findById(id) {
  return postStore.posts.get(Number(id)) || null;
}

function create(fields) {
  const post = {
    id: postStore.nextId(),
    title: fields.title,
    body: fields.body || '',
    authorId: fields.authorId,
  };
  postStore.posts.set(post.id, post);
  return post;
}

function update(id, patch) {
  const post = findById(id);
  if (!post) return null;
  if (patch.title !== undefined) post.title = patch.title;
  if (patch.body !== undefined) post.body = patch.body;
  return post;
}

function remove(id) {
  return postStore.posts.delete(Number(id));
}

module.exports = { findAll, findById, create, update, remove };