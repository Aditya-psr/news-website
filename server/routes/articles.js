/**
 * Copyright 2025 Aditya Pratap Singh Ravat
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const express = require("express");
const router = express.Router();
const Article = require("../models/Article");
const verifyToken = require("../middleware/auth");

// Utility to convert category to Title Case
const toTitleCase = (str) =>
  str
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

// Get all or filtered articles
router.get("/", async (req, res) => {
  const { category } = req.query;
  const filter = category ? { category } : {};
  const articles = await Article.find(filter).sort({ date: -1 });
  res.json(articles);
});

// Get single article
router.get("/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) return res.status(404).json({ message: "Not found" });
  res.json(article);
});

// Create article (protected)
router.post("/", verifyToken, async (req, res) => {
  try {
    const body = req.body;

    // Normalize category to Title Case
    if (body.category) {
      body.category = toTitleCase(body.category);
    }

    const article = new Article(body);
    await article.save();
    res.status(201).json(article);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update article (protected)
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const body = req.body;

    // Normalize category to Title Case
    if (body.category) {
      body.category = toTitleCase(body.category);
    }

    const updated = await Article.findByIdAndUpdate(req.params.id, body, {
      new: true,
    });

    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete article (protected)
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deleted = await Article.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
