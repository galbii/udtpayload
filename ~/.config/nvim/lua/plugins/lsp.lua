-- Which-key for keybinding hints
{
  "folke/which-key.nvim",
  event = "VeryLazy",
  config = function()
    local wk = require("which-key")
    wk.setup({
      win = {
        border = "rounded",
        padding = { 2, 2, 2, 2 },
      },
      filter = {
        enabled = true,
        exclude = function(keymap) 
          return keymap.desc ~= nil 
        end,
      },
    })
    
    -- Register mappings using the correct format per documentation
    wk.add({
      ["<leader>b"] = { name = "Buffers" },
      
      ["<leader>f"] = { name = "Find/Files/Ferret" },
      ["<leader>fg"] = { "<cmd>Telescope live_grep<cr>", "Grep" },
      ["<leader>fb"] = { "<cmd>Telescope buffers<cr>", "Buffers" },
      ["<leader>fh"] = { "<cmd>Telescope help_tags<cr>", "Help" },
      ["<leader>fa"] = { "<cmd>Ack<Space>", "Ack Search" },
      ["<leader>fw"] = { "<cmd>Ack <cword><cr>", "Ack Word" },
      
      ["<leader>g"] = { name = "Git/Goto" },
      ["<leader>gd"] = { "<cmd>YcmCompleter GoTo<cr>", "Go To Definition" },
      ["<leader>gr"] = { "<cmd>YcmCompleter GoToReferences<cr>", "Go To References" },
      ["<leader>gt"] = { "<cmd>YcmCompleter GetType<cr>", "Get Type" },
      ["<leader>gf"] = { "<cmd>YcmCompleter FixIt<cr>", "Fix It" },
      
      ["<leader>l"] = { name = "LSP" },
    })
  end,
},

-- Register mappings using the add() method instead of register()
which_key.add({
  -- Buffer mappings
  { "<leader>b", group = "Buffers" },
  
  -- Find/Files/Ferret mappings
  { "<leader>f", group = "Find/Files/Ferret" },
  { "<leader>fg", "<cmd>Telescope live_grep<cr>", desc = "Grep" },
  { "<leader>fb", "<cmd>Telescope buffers<cr>", desc = "Buffers" },
  { "<leader>fh", "<cmd>Telescope help_tags<cr>", desc = "Help" },
  { "<leader>fa", "<cmd>Ack<Space>", desc = "Ack Search" },
  { "<leader>fw", "<cmd>Ack <cword><cr>", desc = "Ack Word" },
  
  -- Git/Goto mappings
  { "<leader>g", group = "Git/Goto" },
  { "<leader>gd", "<cmd>YcmCompleter GoTo<cr>", desc = "Go To Definition" },
  { "<leader>gr", "<cmd>YcmCompleter GoToReferences<cr>", desc = "Go To References" },
  { "<leader>gt", "<cmd>YcmCompleter GetType<cr>", desc = "Get Type" },
  { "<leader>gf", "<cmd>YcmCompleter FixIt<cr>", desc = "Fix It" },
  
  -- LSP mappings
  { "<leader>l", group = "LSP" },
}) 