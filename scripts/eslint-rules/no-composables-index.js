module.exports = {
  create (context) {
    return {
      ImportDeclaration (node) {
        if (node.source.value === '@/composables') {
          context.report(node.source, 'Do not import from "@/composables"')
        }
      },
    }
  },
}
